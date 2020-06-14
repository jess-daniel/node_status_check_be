const validator = require('validator');
const Resource = require('./resourcesModel');

const validateUuid = (req, res, next) => {
  const { id } = req.params;

  if (validator.isUUID(id) === false) {
    return res.status(400).json({ messgae: `${id} is not a valid UUID` });
  }

  Resource.findById(id)
    .then((resource) => {
      if (resource) {
        req.resource = resource;
        next();
      } else {
        res.status(404).json({
          message: 'The resource with the given id could not be found',
        });
      }
    })
    .catch(next);
};

module.exports = validateUuid;
