const process = require('process');
const replace = require('replace-in-file');
const isProduction = process.env.NODE_ENV === 'production';
/*
const env = isProduction && require('dotenv').config();
const status = isProduction ? 'published' : 'all';
const options = {
  files: 'src/constants.js',
  from: /MESSAGE_STATUS[ =]+'[$\w]+'/g,
  to: `MESSAGE_STATUS = '${status}'`,
  allowEmptyPaths: false,
  encoding: 'utf8',
};

replace(options)
  .then(changedFiles => {
    console.log('status', status);
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
  */
