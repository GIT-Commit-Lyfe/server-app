const log = require("../../utils/log");
const asyncForEach = require('../../utils/asyncForEach');
const { deleteFile } = require("../../helpers/g-cloud-storage");
const { registerFile } = require("./controller");

async function multiDelete(urls = [], { deleteData, urlObj } = { deleteData: false, urlObj: {} }) {
  if (!Array.isArray(urls)) {
    const message = "[multi-delete]:urls must be in array of url string";
    const result = {
      error: true,
      status: 400,
      message,
    }
    log.warn(message);
    return result;
  }
  
  const allString = urls.every((item) => typeof item === "string");
  if (!allString) {
    const message = "[multi-delete]:url element must be string";
    const result = {
      error: true,
      status: 400,
      message,
    }
    log.warn(message);
    return result;
  }
  
  try {
    log.info(`Deleting ${urls.length} unused file URLs...`);
    await asyncForEach(urls, async (url) => {
      await deleteFile(url).catch(async (err) => {
        const message = `[multi-delete]:deleting file: ${url}`;
        log.error(message);
        log.error(err.message);
        log.error(err);
        
        // register to unused file urls table
        await registerFile({ url }).catch(err => {
          const message = `[multi-delete]:registering missing file: ${url}`;
          log.error(message);
          log.error(err.message);
          log.error(err);
        });
      });

      if (deleteData) {
        await deleteMultipleByPK([urlObj[url]]).catch(err => {
          const message = `[multi-delete]:deleting missing file data: ${url}`;
          log.error(message);
          log.error(err.message);
          log.error(err);
        });
      }
    })
    
    const result = {
      error: false,
    }
    return result;
  } catch (err) {
    const message = "[multi-delete]:internal server error";
    const result = {
      error: true,
      status: 500,
      message,
    }
    log.error(message);
    log.error(err.message);
    log.error(err);
    return result;
  }
}

module.exports = {
  multiDelete,
}