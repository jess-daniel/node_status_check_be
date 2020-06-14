const db = require('../data/dbConfig');

module.exports = {
  get,
  findById,
  add,
  update,
  remove,
};

function get() {
  return db('resources');
}

function findById(id) {
  return db('resources').where({ id }).first();
}

function add(resource) {
  return db('resources')
    .insert(resource, 'id')
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db('resources')
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db('resources')
    .where({ id })
    .del()
    .then(() => {
      return findById(id);
    });
}
