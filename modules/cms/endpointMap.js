const _ = require("lodash");
const log = require("../../utils/log");
const models = require("../../models");
const validator = require("../../middleware/fileValidator/validator.json");
const { findAll, findOneByPK, createOne, updateOneByPK, deleteOneByPK, deleteMultipleByPK, demigrate } = require("./controller");
const { cmsAuthorize } = require("../auth/middleware");
const deleteUpload = require("../../middleware/deleteUpload");

module.exports = {
  cms: [
    deleteUpload,
    async (req, res, next) => {
      const { routeId } = req.params;
      if (!models[routeId]) {
        const message = "[cms]:no available table";
        log.error(message);
        res.status(404).json({ message });
        return;
      }
      const { id } = req.query;
      const form = Object.assign({}, req.body);
      const formKeys = Object.keys(form);
      const ref = validator[routeId];
      switch (req.method) {
        case "GET":
          if (id) {
            try {
              const foundOne = await findOneByPK(routeId, { id });
              const message = foundOne ? `data id:${foundOne.id} found in ${routeId} table.` : `id:${id} not found in ${routeId} table.`;
              log.info(message);
              res.status(200).json(foundOne);
            } catch(err) {
              const message = "[cms]:internal server error";
              log.error(message);
              log.error(err.message);
              log.error(err);
              res.status(500).json({ message });
            }
            return;
          }
          try {
            const foundList = await findAll(routeId);
            const message = `${foundList.length} data found in ${routeId} table.`;
            log.info(message);
            res.status(200).json(foundList);
          } catch(err) {
            const message = "[cms]:internal server error";
            log.error(message);
            log.error(err.message);
            log.error(err);
            res.status(500).json({ message });
          }
          return;
        case "POST":
          // TODO: uncomment these when validation reenabled
          // const validToCreate = _.isEqual(formKeys, ref) || _.isEqual(formKeys, ["id", ...ref]);
          // if (!validToCreate) {
          //   const message = "[cms]:no valid data";
          //   log.error(message);
          //   res.status(404).json({ message });
          //   return;
          // }

          try {
            const created = await createOne(routeId, form);
            const message = `data id:${created.id} added to ${routeId} table.`;
            log.info(message);
            res.status(200).json(created);
          } catch(err) {
            const message = "[cms]:internal server error";
            log.error(message);
            log.error(err.message);
            log.error(err);
            res.status(500).json({ message });
          }
          return;
        case "PATCH":
          if (!id) {
            const message = "[cms]:no id defined";
            log.error(message);
            res.status(404).json({ message });
            return;
          }
          const validToUpdate = _.intersection(formKeys, ref).length === formKeys.length;
          if (!validToUpdate) {
            const message = "[cms]:no valid data";
            log.error(message);
            res.status(404).json({ message });
            return;
          }
          try {
            const updatedOne = await updateOneByPK(routeId, { id, form });
            const message = updatedOne ? `data id:${updatedOne.id} updated to ${routeId} table.` : `id:${id} not found in ${routeId} table.`;
            log.info(message);
            res.status(200).json(updatedOne);
          } catch(err) {
            const message = "[cms]:internal server error";
            log.error(message);
            log.error(err.message);
            log.error(err);
            res.status(500).json({ message });
          }
          return;
        case "DELETE":
          const { multiple } = req.query;
          const isBulkDelete = multiple === "1";

          if (!id) {
            const message = "[cms]:no id defined";
            log.error(message);
            res.status(404).json({ message });
            return;
          }

          if (isBulkDelete) {
            try {
              const deletedIds = await deleteMultipleByPK(routeId + `${routeId[routeId.length-1] === "s" ? "e" : ""}s`, { id });
              const message = "data with these ids deleted.";
              log.info(message);
              log.info(deletedIds);
              res.status(200).json({ message, ids: deletedIds });
            } catch(err) {
              const message = "[cms]:internal server error";
              log.error(message);
              log.error(err.message);
              log.error(err);
              res.status(500).json({ message });
            }
            return;
          }
          try {
            const deletedOne = await deleteOneByPK(routeId, { id });
            const message = deletedOne ? `data id:${deletedOne.id} deleted from ${routeId} table.` : `id:${id} not found in ${routeId} table.`;
            log.info(message);
            res.status(200).json(deletedOne);
          } catch(err) {
            const message = "[cms]:internal server error";
            log.error(message);
            log.error(err.message);
            log.error(err);
            res.status(500).json({ message });
          }
          return;
        default:
          const message = "[cms]:invalid method";
          log.warn(message);
          res.status(405).json({ message });
          return;
      }
    }
  ],
  "wipe-data": [
    cmsAuthorize,
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[wipe-data]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { routeId } = req.params;
      await demigrate(routeId);
      const message = "done";
      res.status(200).json({ message });
    }
  ]
}