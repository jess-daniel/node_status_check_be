const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { auth0 } = require('./manageAuth0');
const User = require('../users/usersModel');

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = await auth0.oauth.passwordGrant({
      username,
      password,
      realm: 'Username-Password-Authentication',
    });
    console.log('userData', userData);
    res.json({ message: 'user signed in', userData });
  } catch (error) {
    next(error);
  }
});

// adds a new user if the user does not exist yet
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, name } = req.body;

    const user = await User.findByFilter({ email });

    if (user === undefined) {
      const createdUser = await auth0.database.signUp({
        email,
        password,
        username,
        connection: 'Username-Password-Authentication',
      });
      console.log('created user', createdUser);
      if (Object.keys(createdUser).length === 0) {
        return res.status(400).json({ message: 'the user was not created' });
      }
      const newUser = await User.add({ name, email, id: uuidv4() });
      if (newUser) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({ message: 'Problem creating user' });
      }
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
