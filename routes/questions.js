const express = require('express');
const router = express.Router();
const Question = require('../controllers/question');

router.post('/', Question.createOne);
router.get('/', Question.getAll);
router.put('/edit/:id', Question.editOne);
router.delete('/delete/:id', Question.deleteOne);
router.put('/voteup/:id', Question.voteUp)



module.exports = router;
