const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

const Users = require('./usersModel');

// middlewares
const validateUserId = require('./validateUserId');

// get all users
router.get('/', (req, res) => {
  Users.get().then((users) => {
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

// adds a new user if the user does not exist yet
router.post('/', (req, res, next) => {
  const userData = req.body;
  const { email } = userData;

  Users.findByFilter({ email }).then((user) => {
    if (user === undefined) {
      Users.add({ ...userData, id: uuidv4() })
        .then((newUser) => {
          if (newUser) {
            res.status(201).json(newUser);
          } else {
            res.status(400).json({ message: 'Problem creating user' });
          }
        })
        .catch(next);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
