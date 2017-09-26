// import Minio from 'minio';

import AWS from 'aws-sdk';
import Promise from 'Bluebird';
import fs from 'fs';

const DO = new AWS.S3({
  endpoint: process.env.DIGITAL_OCEAN_SPACES_ENDPOINT,
  accessKeyId: process.env.DIGITAL_OCEAN_SPACES_ACCESS_KEY,
  secretAccessKey: process.env.DIGITAL_OCEAN_SPACES_SECRET_KEY
});

export function listBuckets() {
  return new Promise((resolve, reject) => {
    DO.listBuckets({}, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: 'me-uploads',
      Key: file.originalname,
      ContentType: file.mimetype,
      Body: fs.createReadStream(file.path),
      ACL: 'public-read'
    };
    DO.upload(params, function(err, data) {
      if (err) return reject(err);
      resolve(data.Location);
    });
  });
}
