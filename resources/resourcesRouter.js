const { v4: uuidv4 } = require('uuid');
// const setStatus = require('../cron');
const router = require('express').Router();

const {
  addCronJob,
  removeCronJob,
  cronJobExists,
  updateCronJob,
} = require('../cron');

const checkStatus = require('../utils/checkStatus');
const Resource = require('./resourcesModel');

// middlewares
const validateUuid = require('./validateUuid');
const validateResource = require('./validateResource');

// get a list of resources
router.get('/', (req, res, next) => {
  Resource.get()
    .then((resources) => {
      if (resources.length !== 0) {
        res.json(resources);
      } else {
        res.status(404).json({ message: 'No resources could be found' });
      }
    })
    .catch(next);
});

// get a single resource by ID
router.get('/:id', validateUuid, (req, res) => {
  const { resource } = req;
  res.json(resource);
});

// get the status of the resource's cron job
router.get('/:id/job', validateUuid, (req, res) => {
  const { resource } = req;
  const value = cronJobExists(resource.name);
  if (!value) {
    res.json({
      message: `The status of ${resource.name} is not being watched`,
      cron_status: value,
    });
  } else {
    res.json({
      message: `The status of ${resource.name} is active`,
      cron_status: value,
    });
  }
});

// add a new resource and create a cron job
router.post('/', validateResource(), (req, res, next) => {
  const { body } = req;

  Resource.add({ ...body, id: uuidv4() })
    .then((resource) => {
      if (resource) {
        // adds the new cron job and starts it
        addCronJob(resource.name, resource.link, resource.id, checkStatus);
        res.json(resource);
      } else {
        res.status(400).json('Something went wrong adding the resource');
      }
    })
    .catch((err) => {
      next(err);
    });
});

// delete a resource and remove it's cron job
router.delete('/:id', validateUuid, (req, res, next) => {
  const { id } = req.params;
  const { resource } = req;

  // resource.name is used as the job key
  removeCronJob(resource.name);

  Resource.remove(id)
    .then(() => {
      return res.json(resource);
    })
    .catch(next);
});

// update a resource
router.put('/:id', validateUuid, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Resource.update(body, id)
    .then((resource) => {
      res.json(resource);
    })
    .catch(next);
});

// update a resource's cron job
router.put('/:id/job', validateUuid, (req, res) => {
  const { resource } = req;
  const { body } = req;
  if (!body.time) {
    return res
      .status(400)
      .json({ message: 'You must include a new time for the cron job' });
  }

  updateCronJob(resource.name, body.time);

  res.json({ message: 'The cron job was updated successfully', resource });
});

module.exports = router;
