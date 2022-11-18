[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# aws-s3-component

This component is based on Open Integration Hub framework, allowing this to connect with other components in order to have different flow exchanging data in a specific goal of transformation for the information.

This component allows to get a connection with a AWS S3 bucket and handle the content inside the bucket.

## Features

- Get the list of all buckets of the account.
- Create a new bucket for the account.
- Upload a file from a local machine to an specific S3 bucket.
- Get the list of files in a specific bucket.
- Delete an specific bucket inside the account.
- Get a file that is inside a bucket.
- Get the grant of a bucket.

## Libraries

- [msgbroker-nxg-cg](https://www.npmjs.com/package/msgbroker-nxg-cg)
- [utils-nxg-cg](https://www.npmjs.com/package/utils-nxg-cg)
- [loging-elastic-cg-lib](https://www.npmjs.com/package/loging-elastic-cg-lib)
- [aws-s3-cg-lib](https://www.npmjs.com/package/aws-s3-cg-lib)

> For more detail of the functionality review **[aws-s3-cg-lib](https://github.com/CloudGenUser/aws-s3-cg-lib/blob/main/README.md)** documentation

## Installation

Docker image: cloudgenuser/aws-s3-component:1.0.0

Functions
- trigger:
  - awss3_source
- action:
  - awss3

Fields:
- flag: The string that contains the actinon to execute, can be one of this: CREATETBUCKET, DELETEBUCKET, GETBUCKETGRANTS, GETFILE, GETLISTBUCKETS, GETLISTFILESINBUCKET, UPLOADFILE . The string is not case sensitive.
- accessKey: Is the key to grant you access to the Amazon services.
- secretKey: Is the password access related to the key.
- region: Is a code that corresponds to the zone of the services in wich the Amazon services are alocated according with the user contract to use the AWS services, the list of codes and what is the neares code in user zone can be reviewed in the next link: https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/
- bucketName: The name of the bucket that in wich is required to create, deleted, to know grants, to search a file, to get the list of files or create the file.
- content: The content of the file to be created.
