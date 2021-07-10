const express = require('express');
const router = express.Router();

const endpointHandlerGenerator = require("../middleware/endpointHandler");
const endpointHandler = endpointHandlerGenerator({ mode: "auth" });

router.get('/', apiDefaultHandler);
router.post('/', apiDefaultHandler);
router.put('/', apiDefaultHandler);
router.patch('/', apiDefaultHandler);
router.delete('/', apiDefaultHandler);

router.get('/:routePath', endpointHandler);
router.post('/:routePath', endpointHandler);
router.put('/:routePath', endpointHandler);
router.patch('/:routePath', endpointHandler);
router.delete('/:routePath', endpointHandler);

router.get('/:routePath/:routeId', endpointHandler);
router.post('/:routePath/:routeId', endpointHandler);
router.put('/:routePath/:routeId', endpointHandler);
router.patch('/:routePath/:routeId', endpointHandler);
router.delete('/:routePath/:routeId', endpointHandler);


function apiDefaultHandler(req, res, next) {
  const NODE_ENV = process.env.NODE_ENV || 'production';
  res.send(`${NODE_ENV} api is running!`);
}

module.exports = router;
