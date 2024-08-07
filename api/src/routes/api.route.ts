const express = require('express');
const router = express.Router();
const controller = require('../controllers/programmingLanguages.controller');

/* GET Player. */
router.get('/', controller.get);
  
// /* POST Player */
// router.post('/', controller.create);

// /* PUT Player */
// router.put('/:id', controller.update);

// /* DELETE Player */
// router.delete('/:id', controller.remove);

export default router;