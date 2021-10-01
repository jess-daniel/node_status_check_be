const axios = require("axios").default;
const CronJobManager = require("cron-job-manager");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const Resource = require("../resources/resourcesModel");
const User = require("../users/usersModel");
const Log = require("../logsResource/logsModel");
const sendMail = require("../utils/mail");

// This file contains all the functions related to the cron jobs

module.exports = {
  addCronJob,
  removeCronJob,
  pauseCronJob,
  updateCronJob,
  cronJobExists,
};

// holds all the cron jobs for the app
const manager = new CronJobManager();

// TODO: create cron job function for tests that gets test data from DB and checks against HTTP response

// adds a new cron job and watches resource status
function addCronJob(key, url, resource_id, checkStatus, time = "*/30 * * * *") {
  checkStatus(url, resource_id);
  manager.add(
    key,
    time,
    async () => {
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          console.log(`${url} is up and running`);
          // update resource status to up/true
          const resource = await Resource.update(
            { status: true, last_check: moment().format() },
            resource_id
          );
          // add log record of the status check
          await Log.add({
            id: uuidv4(),
            last_check: resource.last_check,
            code: res.status,
            status: resource.status,
            resource_id: resource.id,
          });
        }
      } catch (error) {
        // console.log(error);
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
        // send a text/email notification to the user that their resource is down
        const user = await User.findByFilter({
          id: resource.user_id,
        });
        // grab user name and email and pass to email function
        sendMail(
          user.email,
          `${user.name}, resource ${resource.name} at ${resource.link} is down!`
        );
        console.log(`${user.name}, ${url} is down`);
      }
    },
    { start: true }
  );
}

// deletes a cron job from the app
function removeCronJob(key) {
  manager.deleteJob(key);
  console.log(`${key} was removed from job list`);
}

// pause a cron job
function pauseCronJob(key) {
  manager.stop(key);
}

// update the schedule for a cron job
function updateCronJob(key, time) {
  manager.update(key, time);
}

// see if a cron job exists
function cronJobExists(key) {
  return manager.exists(key);
}
