const axios = require('axios');
const moment = require('moment');

const Resource = require('../resources/resourcesModel');

module.exports = async (url, resource_id) => {
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      console.log(`${url} is up and running`);
      // update resource status to up/true
      await Resource.update(
        { status: true, lastCheck: moment().format() },
        resource_id
      );
    } else {
      // update resource status to down/false
      const resource = await Resource.update(
        { status: false, lastCheck: moment().format() },
        resource_id
      );

      console.log(`${resource.name} at ${resource.link} is down`);
    }
  } catch (error) {
    console.log(error);
  }
};
