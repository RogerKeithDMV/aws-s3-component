
const {objectAWSS3Req,awss3} = require('aws-s3-cg-lib');

const fs = require('fs');
const path = require('path');


describe('suite aws s3 test process', () => {
    //jest.setTimeout(8000);
    const expect_result = JSON.parse(fs.readFileSync(path.join(__dirname, 'buckets.json'), {encoding: 'utf8'}));
    const expect_result1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'bucketFiles.json'), {encoding: 'utf8'}));
    const expect_result2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'getFile.json'), {encoding: 'utf8'}));
   // const csv_content1 = fs.readFileSync(path.join(__dirname, 'response.csv'), {encoding: 'base64'});
    //arreglar
    //estimulo
    //observar el resultado

    test('test option GETLISTBUCKETS', async () => {
        let properties = {...objectAWSS3Req};  
        properties.flag = "GETLISTBUCKETS";
        properties.region = "us-east-1";

        properties.accessKey = "AKIASILC5JJWBH22BOI4";
        properties.secretKey = "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";
        const data = await awss3({}, properties, true);
        var preJson = JSON.stringify(data);
        var parsed = JSON.parse(preJson);
        //console.log("Data: "+data);
        expect(JSON.stringify(data)).toContain("cm-qq4cl-image-registry-us-west-1-iyigrippcyswtgikkqufjyvpdpuv");
    });

    test('test option GETLISTFILESINBUCKET', async () => {
        let properties = {...objectAWSS3Req};  
        properties.flag = "GETLISTFILESINBUCKET";
        properties.region = "us-east-1";
        properties.bucketName = "scdf-cg-bucket";
        
        properties.accessKey = "AKIASILC5JJWBH22BOI4";
        properties.secretKey = "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";
        const data = await awss3({}, properties, true);
        //var preJson = JSON.stringify(data);
        //var parsed = JSON.parse(preJson);
        //expect(JSON.stringify(data)).toMatchObject(expect_result1);
        expect(JSON.stringify(data)).toContain("JsonToExcelSink-0.0.1.jar");
    });

    test('test option GETFILE', async () => {
        let properties = {...objectAWSS3Req};  
        properties.flag = "GETFILE";
        properties.region = "us-east-1";
        properties.bucketName = "scdf-cg-bucket";
        properties.fileName = "PruebaJSON2.json";
        properties.accessKey = "AKIASILC5JJWBH22BOI4";
        properties.secretKey = "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";
        const data = await awss3({}, properties, true);
        //expect(JSON.parse(data)).toMatchObject(expect_result2);
        expect(JSON.stringify(data)).toContain("mymail@mail.com");
    });

    test('test option sending wrong accesskey and secretkey in GETLISTBUCKETS', async () => {
        let properties = {...objectAWSS3Req};  
        properties.flag = "GETLISTBUCKETS";
        properties.region = "us-east-1";
        properties.accessKey = "errortest5050";
        properties.secretKey = "errortest5050";
        await expect(awss3({}, properties, true)).rejects.toThrow();
    });

    test('test option sending wrong accesskey and secretkey in GETFILE', async () => {
        let properties = {...objectAWSS3Req};  
        properties.flag = "GETFILE";
        properties.region = "us-east-1";
        properties.bucketName = "scdf-cg-bucket";
        properties.fileName = "thisFileDoesnotExists.json";
        properties.accessKey = "AKIASILC5JJWBH22BOI4";
        properties.secretKey = "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";
        await expect(awss3({}, properties, true)).rejects.toThrow();
    });

    test('test option get grant in a bucket', async () => {
        let properties = {...objectAWSS3Req};
        properties.flag = "GETBUCKETGRANTS";
        properties.region = "us-east-1";
        properties.accessKey = "AKIASILC5JJWBH22BOI4";
        properties.secretKey = "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";
        properties.bucketName = "scdf-cg-bucket";

        const data = await awss3({}, properties, true);
        //console.log("data: " + JSON.stringify(data));
       // await expect(awss3({}, properties, true)).rejects.toThrow();
        expect(JSON.stringify(data)).toContain("Grantee");
    });
})
