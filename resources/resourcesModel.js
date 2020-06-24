const db = require('../data/dbConfig');

module.exports = {
  get,
  findByFilter,
  add,
  update,
  remove,
  resourcesByUser,
};

function get() {
  return db('resources');
}

function findByFilter(filter) {
  return db('resources').where(filter).first();
}

// resourcesByUser
function resourcesByUser(user_id) {
  return db('resources as r')
    .select(
      'u.id as user_id',
      'u.username',
      'r.id as resource_id',
      'r.name',
      'r.link',
      'r.status',
      'r.last_check'
    )
    .join('users as u', 'u.id', 'r.user_id')
    .where('user_id', user_id);
}

function add(resource) {
  return db('resources')
    .insert(resource, 'id')
    .then(([id]) => {
      return findByFilter({ id });
    });
}

function update(changes, id) {
  return db('resources')
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

function remove(id) {
  return db('resources')
    .where({ id })
    .del()
    .then(() => {
      return findByFilter({ id });
    });
}
