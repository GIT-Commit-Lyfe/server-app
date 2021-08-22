// endpoint -> multer single -> 
const multer = require("../../middleware/multer");
const { uploadFile, deleteFile } = require("../../helpers/g-cloud-storage");
const log = require("../../utils/log");

module.exports = {
  "upload": [
    multer.single("file"),
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[upload]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      try {
        const publicURL = await uploadFile(req.file, "cms");
        res.status(200).json({ publicURL });
      } catch (err) {
        const message = "[upload]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
  "delete-upload": [
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[test-delete]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      const { url } = req.body;
      if (!url) {
        const message = "[test-delete]:url not found";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      try {
        const response = await deleteFile(url);
        res.status(200).json({ response });
      } catch (err) {
        const message = "[test-delete]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ]
}