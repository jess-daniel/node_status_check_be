const db = require("../data/dbConfig");

module.exports = {
  get,
  add,
  update,
  remove,
  findByFilter,
  testsByUser,
};

function get() {
  return db("tests");
}

function findByFilter(filter) {
  return db("tests").where(filter).first();
}

function add(test) {
  console.log("test", test);
  return db("tests")
    .insert(test, "id")
    .then(([id]) => {
      return findByFilter({ id });
    });
}

// Auth0 and DB need to stay in sync
function update(changes, id) {
  return db("tests")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findByFilter({ id });
      } else {
        return null;
      }
    });
}

// Shoudn't remove without removing from Auth0
function remove(id) {
  return db("tests")
    .where({ id })
    .del()
    .then(() => {
      return findByFilter({ id });
    });
}

// get tests by user
function testsByUser(user_id) {
  return db("tests as t")
    .select(
      "u.id as user_id",
      "u.username",
      "t.id as test_id",
      "t.fields",
      "t.status",
      "t.last_check"
    )
    .join("users as u", "u.id", "t.user_id")
    .where("user_id", user_id);
}
