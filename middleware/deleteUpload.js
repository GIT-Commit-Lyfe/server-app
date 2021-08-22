const { deleteFile } = require("../helpers/g-cloud-storage");
module.exports = async (req, res, next) => {
  const { url } = req.body;
  if (url) {
    deleteFile(url);
  }
  next();
}