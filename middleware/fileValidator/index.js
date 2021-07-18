const { Sequelize, sequelize } = require('../../db/sequelize')
const asyncForEach = require('../../utils/asyncForEach')
const Papa = require('papaparse')

module.exports = async function (req, res, next) {
  const data = require('./validator.json')[req.body.model]
  // Proses ngambil buffer ke string csv
  let csv = req.file.buffer.toString() // dapet dari req.file (multer.single)
  const rawJSON = await Papa.parse(csv, { header: true }).data
  const isEmpty = _.isEmpty(rawJSON)
  
  if (isEmpty) {
    res.status(400).json({ error: 'Bad Request', message: 'Data empty' })
    return
  }

  const firstRowKeys = Object.keys(rawJSON[0])
  const validated = _.isEqual(firstRowKeys, data)
  
  if (!validated) {
    res.status(400).json({ error: 'Bad Request', message: 'Data invalid' })
    return
  }

  const seedJSON = rawJSON.map((item) => ({
    ...item,
    createdAt: new Date(),
    updatedAt: new Date()
  }))
  await sequelize.queryInterface.bulkInsert(req.body.model, seedJSON)
  next()
}

// server/seed/
// multer -> validator -> require
// body { model: 'brand' }
// body { model: 'collection' }
// body { model: '' }
// body { model: 'brand' }
// body { model: 'brand' }