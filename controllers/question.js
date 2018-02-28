const question = require('../models/Question');
const user = require('../models/User');

class Question {
  static createOne(req,res){
    let input = {
      question: req.body.question,
      user: req.body._id
    }
    question.create({
      question: input.question,
      user: input.user
    }).then(result => {
      user.findOne({
        '_id':input.user
      }).then(userData => {
        userData.questions.push(result._id)
        userData.save()
        .then(jointData => {
          res.status(200)
          .json({
            msg: 'New question submitted',
            question: result,
            user: jointData
          })
        }).catch(err => {
          res.status(500)
          .json({
            msg: 'Unable to add question to user',
            error: err
          })
        })
      }).catch(err => {
        res.status(500)
        .json({
          msg: 'Unable to find user',
          error: err
        })
      })
    }).catch(err => {
      res.status(500)
      .json({
        msg: 'Unable to add question',
        error: err
      })
    })
  }
  
  static getAll (req,res){
    question.find()
    .then(result => {
      res.status(200)
      .json({
        msg: 'Showing all questions',
        questions: result
      })
    }).catch(err => {
      res.status(500)
      .json({
        msg: 'Get all questions failed',
        error: err
      })
    })
  }
  
  static editOne (req,res){
    let input = {
      question: req.body.question
    }
    question.findOneAndUpdate({
      '_id': req.params.id
    },{
      $set:{
        'question': input.question
      }
    },{
      new: true
    }).then(result => {
      res.status(200)
      .json({
        msg: 'Question updated',
        question: result
      })
    }).catch(err => {
      res.status(500)
      .json({
        msg: 'Can not update question',
        error: err
      })
    })
  }
  
  static voteUp (req,res){
    question.findOne({'_id': req.params.id})
    .then(result => {
      result.upVotes.push(req.body.user_id)
      result.save()
        .then(updated => {
          res.status(200)
          .json({
            msg: `User_id: ${req.body.user_id} voted up`,
            votes: updated
          })
        }).catch(err => {
          res.status(500)
          .json({
            msg: 'Sorry you cannot vote twice',
            error: err
          })
        })
    }).catch(err => {
      res.status(500)
      .json({
        msg: 'Vote up error',
        error: err
      })
    })
  }
  
  static voteDown (req,res){
    question.findOne({'_id': req.params.id})
    .then(result => {
      result.downVotes.push(req.body.user_id)
      result.save()
        .then(updated => {
          res.status(200)
          .json({
            msg: `User_id: ${req.body.user_id} voted down`,
            votes: updated
          })
        }).catch(err => {
          res.status(500)
          .json({
            msg: 'Sorry you cannot vote twice',
            error: err
          })
        })
    }).catch(err => {
      res.status(500)
      .json({
        msg: 'Vote down error',
        error: err
      })
    })
  }
  
  static deleteOne (req,res){
    question.remove({'_id':req.params.id})
    .then(result => {
      res.status(200)
      .json({
        msg: 'Question deleted',
        result: result
      })
    }).catch(err => {
      res.status(500)
      .json({
        msg: 'Question deletion failed',
        error: err
      })
    })
  }
}

module.exports = Question;