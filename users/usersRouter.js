const router = require('express').Router();

const { auth0 } = require('../auth/manageAuth0');

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

// get auth0 user profile
router.post('/auth-profile', (req, res, next) => {
  const { accessToken } = req.body;
  auth0
    .getProfile(accessToken)
    .then((profile) => {
      console.log('profile', profile);
      User.findByFilter({ email: profile.email })
        .then((user) => {
          res.json({ user, profile });
        })
        .catch(next);
    })
    .catch(next);
});

// get user by ID
router.get('/:id', validateUserId, (req, res) => {
  const { user } = req;
  res.json(user);
});

module.exports = router;
