const { uploadFiles } = require("../helpers/g-cloud-storage");
module.exports = async (req, res, next) => {
  try {
    const success = await uploadFiles(req.files, "cms");
    if (!success) {
      const message = "uploads failed!";
      log.error(message);
      res.status(500).send({ message });
      return;
    }
    next();
  } catch (err) {
    next();
  }
}