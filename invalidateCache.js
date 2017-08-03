const AWS = require('aws-sdk');
const process = require('process')
const env = require('dotenv').config();

const cloudfront = new AWS.CloudFront();
const timestamp = Date.now().toString();

const params = {
  DistributionId: process.env.REACT_APP_CLOUDFRONT_DISTRIBUTION_ID,
  InvalidationBatch: {
    CallerReference: timestamp,
    Paths:{
      Quantity: 3,
      Items: [
        '/index.html',
        '/asset-manifest.json',
        '/service-worker.js'
      ]
    }
  }
};

cloudfront.createInvalidation(params, function(err, data) {
console.log(process.env);
 return  err
  ? console.log(err, err.stack)
  : console.log(data);
});

