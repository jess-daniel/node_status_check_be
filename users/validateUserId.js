const validator = require('validator');
const User = require('./usersModel');

const validateUserId = (req, res, next) => {
  const { id } = req.params;

  if (validator.isUUID(id) === false) {
    return res.status(400).json({ messgae: `${id} is not a valid UUID` });
  }

  User.findByFilter({ id })
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: 'The resource with the given id could not be found',
        });
      }
    })
    .catch(next);
};

module.exports = validateUserId;
