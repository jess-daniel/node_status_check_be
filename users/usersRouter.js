const router = require('express').Router();

const User = require('./usersModel');

// middlewares
const validateUserId = require('./validateUserId');

// get all users
router.get('/', (req, res) => {
  User.get().then((users) => {
    if (users.length === 0) {
      res.status(404).json({ message: 'There are no users' });
    } else {
      res.json(users);
    }
  });
});

// get user by ID
router.get('/:id', validateUserId, (req, res) => {
  const { user } = req;
  res.json(user);
});

module.exports = router;
