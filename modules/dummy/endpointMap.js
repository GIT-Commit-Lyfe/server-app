const log = require("../../utils/log");

module.exports = {
  'price-banners': [(req, res, next) => {
    res.send([
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
    ])
  }],
  'blogs': [(req, res, next) => {
    res.send([
      {
        "id": 1,
        "url": "https://blog.test/1",
        "cover": "https://cover.test/dummy.jpg"
      },
      {
        "id": 2,
        "url": "https://blog.test/2",
        "cover": "https://cover.test/dummy-2.jpg"
      },
      {
        "id": 3,
        "url": "https://blog.test/3",
        "cover": "https://cover.test/dummy-3.jpg"
      }
    ])
  }],
  'watch-lists': [(req, res, next) => {
    res.send([
      {
        "id": 1,
        "reference": "126710BLRO",
        "significantEdition": "GMT Pepsi",
        "collection": "GMT Master II",
        "marketPrice": 13350,
        "currency": "EUR",
        "raising": true,
        "modelUrl": "https://dummy.com/dummy.jpeg"
      },
      {
        "id": 2,
        "reference": "5711A",
        "significantEdition": "Olive Green",
        "collection": "Nautilus",
        "marketPrice": 99850,
        "currency": "EUR",
        "raising": true,
        "modelUrl": "https://dummy.com/dummy1.jpeg"
      },
    ])
  }],
  'followed-listings': [(req, res, next) => {
    res.send([
      {
        "id": 1,
        "brand": "Rolex",
        "code": "RLX",
        "SECode": "F4",
        "reference": "16610LV",
        "significantEdition": "KERMIT FLAT 4",
        "collection": "Submariner Date",
        "year": "2004",
        "price": 13350,
        "currency": "EUR",
        "condition": "Fair",
        "accomodation": "Full Set",
        "country": "DE",
        "city": "Berlin",
        "sellerType": "Individual Investor",
        "modelUrl": "https://dummy.com/dummy.jpeg"
      },
    ])
  }],
  'popular-models': [(req, res, next) => {
    res.send([
      {
        "id": 1,
        "reference": "126710BLRO",
        "significantEdition": "GMT Pepsi",
        "collection": "GMT Master II",
        "marketPrice": 13350,
        "currency": "EUR",
        "raising": true,
        "modelUrl": "https://dummy.com/dummy.jpeg"
      },
      {
        "id": 2,
        "reference": "5711A",
        "significantEdition": "Olive Green",
        "collection": "Nautilus",
        "marketPrice": 99850,
        "currency": "EUR",
        "raising": true,
        "modelUrl": "https://dummy.com/dummy1.jpeg"
      },
    ])
  }],
  'popular-nearby': [(req, res, next) => {
    res.send([
      {
        "id": 1,
        "brand": "Rolex",
        "code": "RLX",
        "SECode": "F4",
        "reference": "16610LV",
        "significantEdition": "KERMIT FLAT 4",
        "collection": "Submariner Date",
        "year": "2004",
        "price": 13350,
        "currency": "EUR",
        "condition": "Fair",
        "accomodation": "Full Set",
        "country": "DE",
        "city": "Berlin",
        "sellerType": "Individual Investor",
        "modelUrl": "https://dummy.com/dummy.jpeg"
      },
    ])
  }],
  'trending-models': [(req, res, next) => {
    res.send([
      {
        "id": 1,
        "reference": "126710BLRO",
        "significantEdition": "GMT Pepsi",
        "collection": "GMT Master II",
        "marketPrice": 13350,
        "currency": "EUR",
        "raising": true,
        "modelUrl": "https://dummy.com/dummy.jpeg"
      },
      {
        "id": 2,
        "reference": "5711A",
        "significantEdition": "Olive Green",
        "collection": "Nautilus",
        "marketPrice": 99850,
        "currency": "EUR",
        "raising": true,
        "modelUrl": "https://dummy.com/dummy1.jpeg"
      },
    ])
  }],
  'followed-boutiques': [(req, res, next) => {
    res.send(
      [
        {
          "id": 1,
          "avatar": "https://assets.test/avatar.png",
          "boutiqueName": "Rolex Collections",
          "address": "Berlin",
          "distance": 300,
          "unit": "m",
          "approximateTimeInMin": 3,
        },
      ]
    )
  }],
  'boutiques': [(req, res, next) => {
    res.send(
      req.params.routeId ?
        {
          "id": 1,
          "avatar": "https://assets.test/avatar.png",
          "boutiqueName": "Rolex Collections",
          "description": "Welcome to our boutique, we serve you at best",
          "address": "Berlin",
          "fullAddress": "Berlin, Germany",
          "longitude": 58.1233235234,
          "latitude": 12.123124234,
        } : [
          {
            "id": 1,
            "avatar": "https://assets.test/avatar.png",
            "boutiqueName": "Rolex Collections",
            "address": "Berlin",
            "distance": 300,
            "unit": "m",
            "approximateTimeInMin": 3,
          },
        ])
  }],
  'brands': [(req, res, next) => {
    res.send(req.params.routeId ?
      {
        "id": 1,
        "brand": "Rolex",
        "logo": "https://dummy.com/rolex.jpeg",
        "details": "Rolex is lorem ipsum",
        "website": "https://www.rolex.com"
      } : [
        {
          "id": 1,
          "brand": "Rolex",
          "logo": "https://dummy.com/rolex.jpeg"
        },
        {
          "id": 2,
          "brand": "ABP Paris",
          "logo": "https://dummy.com/abp.jpeg"
        },
      ])
  }],
  'collections': [(req, res, next) => {
    res.send(req.params.routeId ?
      {
        "id": 1,
        "brand": "Rolex",
        "collection": "GMT Master II",
        "description": "Lorem ipsum"
      } : [
        {
          "id": 1,
          "collection": "GMT Master II",
          "productionYearStart": "2005",
          "productionYearEnd": "2021",
          "modelUrl": "https://dummy.com/gmt2.jpeg",
          "currency": "EUR",
          "lowestAsk": 13450
        },
        {
          "id": 2,
          "collection": "GMT Master ",
          "productionYearStart": "1954",
          "productionYearEnd": "2007",
          "modelUrl": "https://dummy.com/gmt.jpeg",
          "currency": "EUR",
          "lowestAsk": 10444
        },
      ])
  }],
  'models': [(req, res, next) => {
    res.send(req.params.routeId ?
      {
        "id": 1,
        "reference": "126710BLRO",
        "significantEdition": "GMT Pepsi",
        "collection": "GMT Master II",
        "marketPrice": 13350,
        "deltaPrice": 350,
        "deltaPercent": 2.5,
        "currency": "EUR",
        "raising": true,
        "modelUrl": "https://dummy.com/dummy.jpeg"
      } : [
        {
          "id": 1,
          "reference": "126710BLRO",
          "significantEdition": "GMT Pepsi",
          "collection": "GMT Master II",
          "marketPrice": 13350,
          "currency": "EUR",
          "raising": true,
          "modelUrl": "https://dummy.com/dummy.jpeg"
        },
        {
          "id": 2,
          "reference": "5711A",
          "significantEdition": "Olive Green",
          "collection": "Nautilus",
          "marketPrice": 99850,
          "currency": "EUR",
          "raising": true,
          "modelUrl": "https://dummy.com/dummy1.jpeg"
        },
      ])
  }],
  'listings': [(req, res, next) => {
    res.send(req.params.routeId ?
      {
        "id": 1,
        "brand": "Rolex",
        "code": "RLX",
        "SECode": "F4",
        "reference": "16610LV",
        "significantEdition": "KERMIT FLAT 4",
        "collection": "Submariner Date",
        "year": "2004",
        "price": 13350,
        "currency": "EUR",
        "condition": "Fair",
        "accomodation": "Full Set",
        "country": "DE",
        "city": "Berlin",
        "sellerType": "Individual Investor",
        "sellerId": 1,
        "seller": "Amazing World",
        "description": "Lorem ipsum"
      } : [
        {
          "id": 1,
          "brand": "Rolex",
          "code": "RLX",
          "SECode": "F4",
          "reference": "16610LV",
          "significantEdition": "KERMIT FLAT 4",
          "collection": "Submariner Date",
          "year": "2004",
          "price": 13350,
          "currency": "EUR",
          "condition": "Fair",
          "accomodation": "Full Set",
          "country": "DE",
          "city": "Berlin",
          "sellerType": "Individual Investor",
          "modelUrl": "https://dummy.com/dummy.jpeg"
        },
      ])
  }],
  'listing-assets': [(req, res, next) => {
    res.send([
      "https://dummy.com/dummy.jpeg",
    ])
  }],
  'administration': [(req, res, next) => {
    res.send({
      "currency": "EUR",
      "verificationFee": 250,
      "tax": 150,
      "shipping": 150
    })
  }],
  'price-overview': [(req, res, next) => {
    res.send({
      "currency": "EUR",
      "lowestAsk": 14450,
      "highestBid": 14350,
      "lastDeal": 14350,
      "buyListingId": 1
    })
  }],
}