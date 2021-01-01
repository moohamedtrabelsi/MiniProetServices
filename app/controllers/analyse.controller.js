const config = require("../config/auth.config");
const db = require("../models");
const Analyse = require("../models/analyse.model");
//const Analyse = db.analyse;
//const analyse = db.analyse


exports.analyse = (req,res)=>{
    
    if(req.body.filename){
        const analyse = new Analyse({
            filename : req.body.filename
        })
    
        analyse.save(err =>{
            if(err){
                if (err) {
                    res.status(500).send({ message: err });
                    return; 
                }
            }
                res.send({message:"Analyse added"})
        })
    }else res.status(404).send({message :"insert file"})
  
}
