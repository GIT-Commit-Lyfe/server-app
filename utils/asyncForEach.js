module.exports = async (array, cb) => {
  for (let i = 0; i < array.length; i++) {
    await cb(array[i], i);
  }
}