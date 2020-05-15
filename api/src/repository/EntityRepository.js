function persist (db, entity) {
  db[entity.id] = entity
  db['idCount'] += 1
  console.log(db)
  return entity
}

function get (db, id) {
  return db[id]
}

function remove (db, id) {
  delete db[id]
}

module.exports = {
  get,
  persist,
  remove
}
