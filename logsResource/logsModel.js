const db = require("../data/dbConfig");

module.exports = {
  get,
  findByFilter,
  add,
  getResourceLogs,
};

function get() {
  return db("logs");
}

function findByFilter(filter) {
  return db("logs").where(filter).first();
}

function add(log) {
  return db("logs")
    .insert(log, "id")
    .then(([id]) => {
      return findByFilter({ id });
    });
}

function getResourceLogs(userId) {
  return db("logs as l")
    .select("l.id", "r.name", "r.link", "l.status", "l.code", "l.last_check")
    .join("resources as r", "r.id", "l.resource_id")
    .where("r.user_id", userId);
}
