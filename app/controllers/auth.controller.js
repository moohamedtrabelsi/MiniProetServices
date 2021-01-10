const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    User.findOne({ username: "x" }, (err, u) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.listofdp = [u._id];
       nchallah = 1;
    
    });

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" ,num:nchallah});
          });
        }
      );
    } else {
      Role.findOne({ name: "User" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .populate("listofdp", "-__l")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name.toUpperCase());
      }
      var users = [];

      for (let i = 0; i < user.listofdp.length; i++) {
        users.push( user.listofdp[i].username);
      }

      res.status(200).send({
        
        
        username: user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email: user.email,
        password: user.password,
        roles: authorities[0],
       listofdp:authorities,
       // user: user ,
        
      });
    });
};

exports.getUser = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        
        
        username: user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email: user.email,
        password: user.password,
      
      });
    });
};


exports.updateUser = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.firstname=req.body.firstname,
      user.lastname =req.body.lastname,
      user.email=req.body.email,
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).send({
        
        
          username: user.username,
          firstname:user.firstname,
          lastname:user.lastname,
          email: user.email,
          
        });      });
     // user.password= bcrypt.hashSync(req.body.password, 8)
 
    });
};


thatUser = (usrn)=>{

  User.findOne({
    username: usrn
  })
  

   return user;
    

}

exports.updatelist = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .populate("listdp", "-__v")
 .exec((err, user) => {
      var testhama =1;
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
 
      res.status(200).send({
        
        
        username: user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email: user.email,
        list:user.listdofp,
        hama:testhama,
        
      });
    });
};


exports.email = (req, res) => {

let userData = req.body

    User.findOne({email: userData.email},(error,user)=>{


        if(user){
          res.status(200).send({message:"valide"});
        }else{
            if(!user){
                res.status(401).send({message:"not"})

         }
        }
      })
  
  };


  exports.updatePass = (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: "not" });
          return;
        }
  
        user.password=bcrypt.hashSync(req.body.password),
        user.save(err => {
          if (err) {
            res.status(500).send({ message: "not" });
            return;
          }
  
          res.status(200).send({ 
            message:"valide",
          
           // password: user.password
            password: user.password= bcrypt.hashSync(req.body.password)

            
          });      });
       // user.password= bcrypt.hashSync(req.body.password, 8)
   
      });
  };
  