const db = require('../data/dbConfig');

module.exports = {
  get,
  add,
  update,
  remove,
  findByFilter,
};

function get() {
  return db('users');
}

function findByFilter(filter) {
  return db('users').where(filter).first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => {
      return findByFilter({ id });
    });
}

// Auth0 and DB need to stay in sync
function update(changes, id) {
  return db('users')
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
  return db('users')
    .where({ id })
    .del()
    .then(() => {
      return findByFilter({ id });
    });
}
