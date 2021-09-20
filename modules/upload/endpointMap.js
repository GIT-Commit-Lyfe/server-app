// endpoint -> multer single -> 
const multer = require("../../middleware/multer");
const { uploadFile, deleteFile } = require("../../helpers/g-cloud-storage");
const log = require("../../utils/log");
const asyncForEach = require('../../utils/asyncForEach');

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
        const message = "[delete-upload]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      const { url } = req.body;
      if (!url) {
        const message = "[delete-upload]:url not found";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      try {
        const response = await deleteFile(url);
        res.status(200).json({ response });
      } catch (err) {
        const message = "[delete-upload]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
  "multi-delete-upload": [
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[multi-delete-upload]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { urls } = req.body;
      if (!Array.isArray(urls)) {
        const message = "[multi-delete-upload]:urls must be in array of url string";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      
      const allString = urls.every((item) => typeof item === "string");
      if (!allString) {
        const message = "[multi-delete-upload]:url element must be string";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      
      try {
        await asyncForEach(urls, async (url) => {
          await deleteFile(url).catch(err => {
            const message = `[multi-delete-upload]:error deleting file: ${url}`;
            log.error(message);
            log.error(err.message);
            log.error(err);
            // TODO: register to unused file urls table
          });
        })
        res.sendStatus(200);
      } catch (err) {
        const message = "[multi-delete-upload]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ]
}