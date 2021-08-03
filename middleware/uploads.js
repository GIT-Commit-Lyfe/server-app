const bucket = require('../helpers/g-cloud-storage')

function getPublicURL(folderName, fileName) {
  return `https://storage.googleapis.com/${process.env.GAPI_BUCKET_NAME}/${folderName}/${fileName}`
}

function uploadSingle(req, res, next) {
  if(req.file) {
    const file = bucket.file(req.file.originalname)
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })
    const folderName = 'tes' // ? req.params.folderName?

    stream.on('error', console.log)
    stream.on('finish', () => {
      console.log('File uploaded:', req.file.originalname)
      file.makePublic()
        .then(() => {
          req.publicURL = getPublicURL(folderName, req.file.originalname)
        })
    })
    stream.end(req.file.buffer)

    res.status(201).json({
      file: req.file,
      berhasil: true
    })
  } else {
    res.status(400).json({
      message: 'Invalid upload format'
    })
  }
}

function uploadMultiple(req, res, next) {
  if(req.files) {
    const files = req.files
    const folderName = 'tes' // ? req.params.folderName?
    req.publicURLs = []

    for(let i in files) {
      let uploadFile = bucket.file(folderName + '/' + files[i].originalname)
      const stream = uploadFile.createWriteStream({
        metadata: {
          contentType: files[i].mimetype
        }
      })

      stream.on('error', console.log)
      stream.on('finish', () => {
        console.log('File uploaded:', files[i].originalname)
        uploadFile.makePublic()
          .then(() => {
            req.publicURLs.push(getPublicURL(folderName, files[i].originalname))
            if(req.publicURLs.length === req.files.length) {
              res.status(201).json({
                arr: req.publicURLs,
                berhasil: true
              })
            }
          })
      })
      stream.end(files[i].buffer)
    }
  } else {
    res.status(400).json({
      message: 'Invalid upload format'
    })
  }
}

module.exports = {
  uploadSingle,
}