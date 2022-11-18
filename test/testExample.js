const {log} = require('utils-nxg-cg');
const {awss3,objectAWSS3Opt,objectAWSS3Req} = require('aws-s3-cg-lib');
const express = require('express');

const { request } = require('express');

const app = express();
app.use(express.json());

app.post('/', async(req, res)=>{
  let properties = {...objectAWSS3Req};  
    properties.flag = req.body.flag;
    properties.region = req.body.region;
    properties.bucketName = req.body.bucketName;
    properties.fileName = req.body.fileName;
    properties.content = req.body.content;
    properties.accessKey = req.body.accessKey;
    properties.secretKey = req.body.secretKey;

    try{
      const result = await awss3({data:properties},{});
      log.info("resultado", result);
      res.json(result);
    }

    catch(err){
      res.status(500).json(err);
    }
  })

  app.listen(5000, ()=>{
    console.log("Server ejecutandose en el puerto 5000");
  });