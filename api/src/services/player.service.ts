const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function list(page = 1){
  return ["player 1", "player 2"]
}

// async function create(data){
// }

// async function update(id, data){
// }

// async function remove(id){
// }

module.exports = {
  list,
//   create,
//   update,
//   remove
}