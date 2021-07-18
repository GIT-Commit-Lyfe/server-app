// endpoint -> multer single -> 
const log = require("../../utils/log");
const fileValidator = require('../../middleware/fileValidator')
const multer = require('../../middleware/multer')

module.exports = {
  'seed': [
    multer.single('file'),
    (req, res, next) => {
      console.log('Masuk seed')
      console.log(req.file)
      res.send('masuk seed')
    },
    fileValidator,
    (req, res, next) => {

    }
  ]
}