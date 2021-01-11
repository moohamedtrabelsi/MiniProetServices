const config = require("../config/auth.config");
const db = require("../models");
const Analyse = require("../models/analyse.model");
//const Visite = require("../models/visite.model");
const Visite = db.visite;
const Ordonnance = db.ordonnance
const User = db.user;


exports.visite = (req,res)=>{
    const visite = new Visite({
        o:req.body.ordonnance,
        a:req.body.analyse,
    
    })
    visite.save(err =>{
        if(err){
            if (err) {
                res.status(500).send({ message: err });
                return; 
            }
        }

    });
    res.send({ message: "visite was registered successfully!" });    
};

 exports.sendvisite = (req, res) => {

    if(req.body.filename){
      Visite.findOne({
        a: req.body.filename
      }).exec((err,aa)=>{
  
      User.findOne({
          username: req.body.patient
        })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.visites.push(aa);
  
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            res.status(200).send({             
             aa: aa.filename,
             uu:user.user,
            });  });
          
        });
      }) ;
  }
  else res.status(404).send({message :"niii"})
  };

  exports.getVisite = (req, res) => {
    Visite.findOne({
      _id: req.body.id
    })
      .exec((err, aa) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        res.status(200).send({
        
          filename: aa.a,
         ordonnance:aa.o,
        
        });
      });
  };
