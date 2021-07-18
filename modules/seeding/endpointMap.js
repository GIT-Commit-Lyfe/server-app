// endpoint -> multer single -> 
const fileValidator = require('../../middleware/fileValidator');
const multer = require('../../middleware/multer');

module.exports = {
  'seed': [
    multer.single('file'),
    fileValidator,
    (req, res, next) => {
      const message = `data seeded!`
      res.status(200).json({ message });
    }
  ]
}