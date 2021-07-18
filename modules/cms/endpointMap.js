const _ = require("lodash");
const log = require("../../utils/log");
const models = require("../../models");
const validator = require("../../middleware/fileValidator/validator.json");
const { findAll, findOneByPK, createOne, updateOneByPK, deleteOneByPK } = require("./controller");

module.exports = {
  cms: [
    (req, res, next) => {
      const { routeId } = req.params
      if (!models[routeId]) {
        const message = "[cms]:no available table";
        log.error(message);
        res.status(404).json({ message });
      }

      switch (req.method) {
        case "GET":
          const { id } = req.query;
          if (id) {
            try {
              const foundOne = await findOneByPK(routeId, { id });
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
          const form = Object.assign({}, req.body);
          const formKeys = Object.keys(form);
          const ref = validator[routeId];
          const valid = _.isEqual(formKeys, ref);
          if (!valid) {
            const message = "[cms]:no valid data";
            log.error(message);
            res.status(404).json({ message });
          }

          try {
            await createOne(routeId, form);
            const message = `data added to ${routeId} table.`
            res.status(200).json({ message });
          } catch(err) {
            const message = "[cms]:internal server error";
            log.error(message);
            log.error(err.message);
            log.error(err);
            res.status(500).json({ message });
          }
          return;
        case "PATCH":
          const { id } = req.query;
          if (!id) {
            const message = "[cms]:no id defined";
            log.error(message);
            res.status(404).json({ message });
            return;
          }
          const form = Object.assign({}, req.body);
          const formKeys = Object.keys(form);
          const ref = validator[routeId];
          const valid = _.intersection(formKeys, ref).length === formKeys.length;
          if (!valid) {
            const message = "[cms]:no valid data";
            log.error(message);
            res.status(404).json({ message });
          }
          try {
            const updatedOne = await updateOneByPK(routeId, { id, form });
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
          const { id } = req.query;
          if (!id) {
            const message = "[cms]:no id defined";
            log.error(message);
            res.status(404).json({ message });
            return;
          }
          try {
            const deletedOne = await deleteOneByPK(routeId, { id });
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
          return;
      }
    }
  ],
}