const path = require('path');
const { Storage } = require('@google-cloud/storage');
const log = require('../utils/log');
const asyncForEach = require('../utils/asyncForEach');
const gc = new Storage({
  keyFilename: path.join(__dirname, process.env.GAPI_CREDENTIALS),
  projectId: process.env.GAPI_PROJECT_ID
});
const bucket = gc.bucket(process.env.GAPI_BUCKET_NAME);

function getPublicURL(fileName) {
  return `https://storage.googleapis.com/${process.env.GAPI_BUCKET_NAME}/${fileName}`;
}

function getBlobName(url) {
  const bucketURL = `https://storage.googleapis.com/${process.env.GAPI_BUCKET_NAME}/`;
  return url.replace(bucketURL, "");
}

function uploadFile(fileObj, folder = "general") {
  return new Promise((resolve, reject) => {
    if (!fileObj) {
      const err = {
        message: "no file found"
      }
      reject(err);
    }

    const fileName = folder + "/" + Date.now() + (fileObj.originalname ? `_${fileObj.originalname}` : "");
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: fileObj.mimetype
      }
    })
  
    stream.on('error', reject);
    stream.on('finish', () => {
      log.info(`File uploaded: ${fileName}`);
      file.makePublic()
        .then(() => {
          const publicURL = getPublicURL(fileName);
          log.info(`Public URL: ${publicURL}`);
          resolve(publicURL);
        })
    })
    stream.end(fileObj.buffer);
  })
}

async function uploadFiles(files, folder) {
  // it needs to use multer.fields instead multer.array
  const fields = Object.keys(files);
  try {
    await asyncForEach(fields, async (field) => {
      await asyncForEach(files[field], async (file) => {
        const publicURL = await uploadFile(file, folder);
        file.publicURL = publicURL;
      })
    })
  
    return true;
  } catch (err) {
    throw err;
  }
}

async function deleteFile(url) {
  const blobName = getBlobName(url);
  const file = bucket.file(blobName);
  await file.delete();
}

module.exports = {
  bucket,
  uploadFile,
  uploadFiles,
  deleteFile,
}