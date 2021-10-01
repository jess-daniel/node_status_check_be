const axios = require("axios").default;
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const Resource = require("../resources/resourcesModel");
const Log = require("../logsResource/logsModel");

module.exports = async (url, resource_id) => {
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      console.log(`${url} is up and running`);
      // update resource status to up/true
      const resource = await Resource.update(
        { status: true, last_check: moment().format() },
        resource_id
      );
      await Log.add({
        id: uuidv4(),
        last_check: resource.last_check,
        code: res.status,
        status: resource.status,
        resource_id: resource.id,
      });
    } else {
      // update resource status to down/false
      const resource = await Resource.update(
        { status: false, last_check: moment().format() },
        resource_id
      );
      // add log record of the status check
      await Log.add({
        id: uuidv4(),
        last_check: resource.last_check,
        code: error.response.status,
        status: resource.status,
        resource_id: resource.id,
      });
      console.log(`${resource.name} at ${resource.link} is down`);
    }
  } catch (error) {
    console.log(error);
    // update resource status to down/false
    const resource = await Resource.update(
      { status: false, last_check: moment().format() },
      resource_id
    );
    // add log record of the status check
    await Log.add({
      id: uuidv4(),
      last_check: resource.last_check,
      code: error.response.status,
      status: resource.status,
      resource_id: resource.id,
    });
  }
};
