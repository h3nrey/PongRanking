const players = require('../services/player.service');

async function get(req: any, res: any, next: any) {
  try {
      res.json(await players.list(req.query.page));
  } catch (err) {
    //   console.error(`Error while getting programming languages`, err.message);
    //   next(err);
  }
}

// async function create(req, res, next) {
//   try {
//     res.json(await players.create(req.body));
//   } catch (err) {
//     console.error(`Error while creating programming language`, err.message);
//     next(err);
//   }
// }

// async function update(req, res, next) {
//   try {
//     res.json(await players.update(req.params.id, req.body));
//   } catch (err) {
//     console.error(`Error while updating programming language`, err.message);
//     next(err);
//   }
// }

// async function remove(req, res, next) {
//   try {
//     res.json(await players.remove(req.params.id));
//   } catch (err) {
//     console.error(`Error while deleting programming language`, err.message);
//     next(err);
//   }
// }

module.exports = {
  get,
//   create,
//   update,
//   remove
};