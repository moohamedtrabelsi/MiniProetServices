const config = require("../config/auth.config");
const db = require("../models");
const Ordonnance = require("../models/ordonnance.model");
const ordonnance = db.ordonnance;


exports.createOrdonnance = (req,res)=>{
    const ordonnance = new Ordonnance({
    medicaments : req.body.medicament

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
}