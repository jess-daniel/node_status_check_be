const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const Test = require("./testsModel");
const User = require("../users/usersModel");

// add test
router.post("/", async (req, res, next) => {
  try {
    const { body } = req;

    const test = await Test.add({ ...body, id: uuidv4() });

    if (test) {
      res.status(201).json(test);
    } else {
      res.status(400).json("Something went wrong.");
    }
  } catch (error) {
    next(error);
  }
});

// get a test by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const test = await Test.findByFilter({ id });

    if (test) {
      res.json(test);
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    next(error);
  }
});

// get a user's tests
router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByFilter({ id: userId });

    if (user) {
      const tests = await Test.testsByUser(user.id);
      if (tests.length > 0) {
        res.json(tests);
      } else {
        res.status(404).json({ message: "No tests were found for the user" });
      }
    } else {
      res.status(400).json({ message: "user does not exist" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
