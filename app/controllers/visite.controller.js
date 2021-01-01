const config = require("../config/auth.config");
const db = require("../models");
//const Visite = require("../models/visite.model");
const Visite = db.visite;
const Ordonnance = db.ordonnance

exports.visite = (req,res)=>{
    
    if(req.body.mame){
        const visite = new Visite({
            name : req.body.name
        })
    
        visite.save(err =>{
            if(err){
                if (err) {
                    res.status(500).send({ message: err });
                    return; 
                }
            }

            Ordonnance.findOne({ username: "x" }, (err, u) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
          
              /*  user.listofdp = [u._id];
                 nchallah = 1;*/
              
              });
                res.send({message:"ordonnance added"})
        })
    }else res.status(404).send({message :"insert med"})
  
}