const config = require("../config/auth.config");
const db = require("../models");
const Ordonnance = require("../models/ordonnance.model");
const ordonnance = db.ordonnance;


exports.createOrdonnance = (req,res)=>{
    
    if(req.body.medicaments){
        const ordonnance = new Ordonnance({
            medicaments : req.body.medicaments
        })
    
        ordonnance.save(err =>{
            if(err){
                if (err) {
                    res.status(500).send({ message: err });
                    return; 
                }
            }
                res.send({message:"ordonnance added"})
        })
    }else res.status(404).send({message :"insert med"})
  
}