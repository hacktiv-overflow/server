const express = require('express');
const router = express.Router();
const Question = require('../controllers/question');

router.post('/', Question.createOne);
router.get('/', Question.getAll);
router.put('/edit/:id', Question.editOne);
router.delete('/delete/:id', Question.deleteOne);
router.put('/voteup/:id', Question.voteUp)
router.put('/votedown/:id', Question.voteDown)


module.exports = router;
