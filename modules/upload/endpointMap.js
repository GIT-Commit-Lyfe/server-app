// endpoint -> multer single -> 
const multer = require("../../middleware/multer");
const { uploadFile, deleteFile } = require("../../helpers/g-cloud-storage");
const log = require("../../utils/log");
const asyncForEach = require('../../utils/asyncForEach');
const { multiDelete } = require("./helpers");
const { getAllURLByPK } = require("./controller");

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
        res.status(400).json({ message });
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
      const { error, status, message } = await multiDelete(urls);
      if (error) {
        res.status(status).json({ message });
        return;
      }

      res.sendStatus(200);
    }
  ],
  "multi-delete-unused": [
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[multi-delete-unused]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { ids } = req.body;
      if (!Array.isArray(ids)) {
        const message = "[multi-delete-unused]:ids must be in array of id";
        log.warn(message);
        res.status(400).json({ message });
      }
      
      const { urls, urlObj } = await getAllURLByPK(ids);

      const { error, status, message } = await multiDelete(urls, { urlObj, deleteData: true });
      if (error) {
        res.status(status).json({ message });
        return;
      }

      res.sendStatus(200);
    }
  ]
}