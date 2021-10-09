const _ = require("lodash");
const log = require("../../utils/log");
const models = require("../../models");
const validator = require("../../middleware/fileValidator/validator.json");
const { findAll, findOneByPK, createOne, updateOneByPK, deleteOneByPK, deleteMultipleByPK, demigrate, audit, auditStatus, patchAuthorToModels } = require("./controller");
const { cmsAuthorize, authenticate } = require("../auth/middleware");

module.exports = {
  cms: [
    ...authenticate,
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
              if (foundOne) {
                await patchAuthorToModels(routeId, [foundOne]);
              }
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
            if (foundList.length > 0) {
              await patchAuthorToModels(routeId, foundList);
            }
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
          const validForm = _.pick(form, ["id", ...ref]);

          try {
            const created = await createOne(routeId, validForm);
            await audit(req.userDetails.id, routeId, created, auditStatus.CREATED);
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
            if (updatedOne) {
              await audit(req.userDetails.id, routeId, updatedOne, auditStatus.UPDATED);
            }
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
              const [array, status] = await deleteMultipleByPK(routeId + `${routeId[routeId.length-1] === "s" ? "e" : ""}s`, { id });
              const ids = id.split(",");
              if (status.rowCount > 0) {
                ids.forEach(id => {
                  audit(req.userDetails.id, routeId, { id }, auditStatus.DELETED);
                });
              }
              const message = "data with these ids deleted.";
              log.info(message);
              log.info(ids);
              res.status(200).json({ message, ids, status });
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
            await audit(req.userDetails.id, routeId, deletedOne, auditStatus.DELETED);
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
  ],
  "demigrate": [
    cmsAuthorize,
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[demigrate]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { routeId } = req.params;
      if (!routeId) {
        const message = "[demigrate]:file name not defined";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }

      await demigrate(routeId, { raw: true });
      const message = "done";
      res.status(200).json({ message });
    }
  ],
}