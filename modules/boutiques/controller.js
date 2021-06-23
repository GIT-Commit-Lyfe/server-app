const { Boutique } = require('')

// code
function findById() {
  let result = await model.find()
  // ada pengolahan di sini
  return [
    {
      "id": 1,
      "code": "RLX",
      "reference": "22334",
      "raising": true,
      "price": 14500,
      "currency": "EUR"
    },
    {
      "id": 2,
      "code": "RLX",
      "reference": "44556",
      "raising": false,
      "price": 12500,
      "currency": "EUR"
    },
  ]
}

module.exports = {
  findById
}