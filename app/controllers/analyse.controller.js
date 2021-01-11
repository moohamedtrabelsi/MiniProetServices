const config = require("../config/auth.config");
const db = require("../models");
const Analyse = require("../models/analyse.model");
//const Analyse = db.analyse;
//const analyse = db.analyse


exports.analyse = (req,res)=>{
    
    if(req.body.id){
        const analyse = new Analyse({
            _id : req.body.id
        })
        User.findOne({
            username: req.body.doctor
          })
          .exec((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.analyses.push(analyse._id)
          });
    
      res.status(200).send({message:"yess"})
    }
    else res.status(404).send({message :"insert file"})
  
}


exports.getAnalyse = (req, res) => {
  Analyse.findOne({
    _id: req.body.id
  })
    .exec((err, a) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
      
        filename: a.filename,
        doctor:a.doctor,
        patient:a.patient,
      
      });
    });
};
