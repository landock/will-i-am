const fs = require('fs');
const assert = require('assert');
const zlib = require('zlib');

const path = require('path');
const process = require('process');

const glob = require('glob');
const mime = require('mime-types');
const AWS = require('aws-sdk');
const s3Client = new AWS.S3();

process.chdir("build");

const noCacheHeaderFiles = glob.sync("*.+(html|json|js|ico)");
const cacheHeaderFiles= glob.sync("static/**/*.+(png|jpg|gif|svg|js|js.map|css|css.map)");

function paramBuilder(file) {

  assert(file, 'File argument needed');

  let shouldCache = file.includes('static');
  let params = {
    ACL: 'public-read',
    Bucket: 'staging.will.i.am',
    ContentDisposition: 'inline',
    CacheControl: shouldCache ? 'max-age=31536000, immutable' : 'no-cache',
    Key: file,
    Body: shouldCache
      ? fs.createReadStream(file).pipe(zlib.createGzip())
      : fs.createReadStream(file),
    ContentType: mime.lookup(file),
  }

  if(shouldCache) {
    params.ContentEncoding = 'gzip';
  }

  return params;

}

noCacheHeaderFiles.forEach(function(file){
  s3Client.upload(paramBuilder(file), function(err, data) {
    err ? console.log(err) : console.log( data);
  });
});

cacheHeaderFiles.forEach(function(otherFile){
  s3Client.upload(paramBuilder(otherFile), function(err, data) {
    err ? console.log(err) : console.log( data);
  });
});
