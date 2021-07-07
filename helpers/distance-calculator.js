/**
 * @summary
 * Menghitung lokasi terdekat antara titik A dan array B
 * 
 * @param { Object } targetLocation => { latitude, longitude }
 * @param { Array } locationData => [ { latitude, longitude }, { latitude, longitude }, ...]
 * 
 * @returns { Object } => { latitude, longitude }
 */

function closestLocation(targetLocation, locationData) {
  function vectorDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy)
  }

  function locationDistance(location1, location2) {
    let dx = location1.latitude - location2.latitude
    let dy = location1.longitude - location2.longitude
    return vectorDistance(dx, dy)
  }

  return locationData.reduce((prev, curr) => {
    let prevDistance = locationDistance(targetLocation, prev)
    let currDistance = locationDistance(targetLocation, curr)
    return (prevDistance < currDistance) ? prev : curr
  }, {});
}

module.exports = closestLocation