const router = require("express").Router();

const Log = require("./logsModel");

router.get("/", async (req, res) => {
  try {
    const logs = await Log.get();
    if (logs.length > 0) {
      res.json(logs);
    } else {
      res.json("No logs found");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const logs = await Log.getResourceLogs(id);
    if (logs) {
      res.json(logs);
    } else {
      res.json("No logs for this user");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
