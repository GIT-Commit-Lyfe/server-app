const { deleteFile } = require("../helpers/g-cloud-storage");
module.exports = async (req, res, next) => {
  const { pastUrl } = req.body;
  if (pastUrl) {
    if (Array.isArray(pastUrl)) {
      const allString = pastUrl.every((item) => typeof item === "string");
      if (allString) {
        const promises = pastUrl.map(item => deleteFile(item));
        Promise.all(promises);
      }
    } else if (typeof pastUrl === "string") {
      deleteFile(pastUrl);
    }
  }
  next();
}