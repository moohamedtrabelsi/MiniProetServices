const uploadFile = require("../middlewares/file");
const fs = require('fs');
const GridFsStorage = require("multer-gridfs-storage");
const Analyse = require("../models/analyse.model");
const db = require("../models");

const User = db.user;

const { Mongoose, mongo } = require("mongoose");
const { mongoose } = require("../models");
const Grid = require('gridfs-stream');
const mongoURI = "mongodb://localhost:27017/HealthSheet";

const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once('open',()=>{
  gfs = Grid(conn.db,mongoose.mongo);
  gfs.collection('photos');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'photos'
        };
        resolve(fileInfo);
    });
  }
});


const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    const analyse = new Analyse({
      filename : req.file.filename
  })

  analyse.save(err =>{
      if(err){
          if (err) {
              res.status(500).send({ message: err });     
          }
      }
  })
  /*
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
  */
    res.status(200).send({
      filename:analyse.filename,
      id:analyse._id,
      doctor:"x",
      patient:"m=no",


    });
  } catch (err) {
    res.status(500).send({
    //  message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {

  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.status(404).send( {message: `Could not find the file: `})
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.status(200).send({ files: files });
    }
  });
};

const getListFilesNames = (req, res) => {

  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.status(404).send( {message: `Could not find the file: `})
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.status(200).send({ filename: files[files.length-1].filename });
    }
  });
};

const send = (req, res) => {

  if(req.body.id){
    Analyse.findOne({
      filename: req.body.filename
    }).exec((err,a)=>{

    User.findOne({
        username: req.body.doctor
      })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.analyses = [a._id];

        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          res.status(200).send({
          
          
            username: user.username,
           
            
          });      });
        
        
      });
    }) ;
 
}
else res.status(404).send({message :"insert file"})
};


const analyse = (req,res)=>{
    gfs.files.find().toArray((err, files) => {
      const analyse = new Analyse({
        filename : files[files.length-1].filename
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
    });
      
  

}

const getimage = (req,res)=>{
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if the input is a valid image or not
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // If the file exists then check whether it is an image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
}



const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
  getimage,
  getListFilesNames,
  analyse,
  send,
};
