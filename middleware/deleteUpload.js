const { deleteFile } = require("../helpers/g-cloud-storage");
module.exports = async (req, res, next) => {
  const { url } = req.body;
  if (url) {
    if (Array.isArray(url)) {
      const allString = url.every((item) => typeof item === "string");
      if (allString) {
        const promises = url.map(item => deleteFile(item));
        Promise.all(promises);
      }
    } else if (typeof url === "string") {
      deleteFile(url);
    }
  }
  next();
}