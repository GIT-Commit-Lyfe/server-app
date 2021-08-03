const path = require('path')
const { Storage } = require('@google-cloud/storage')
const gc = new Storage({
  keyFilename: path.join(__dirname, '/' + process.env.GAPI_CREDENTIALS),
  projectId: process.env.GAPI_PROJECT_ID
})
const bucket = gc.bucket(process.env.GAPI_BUCKET_NAME)

module.exports = bucket