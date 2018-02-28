const user = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
  static signUp (req,res){
    let input = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    }
    user.create({
      email: input.email,
      password: input.password
    }).then(result => {
      res.status(200)
      .json({
        msg: 'User registered',
        user: result
      })
    }).catch(err => {
      res.status(500)
      .json({
        msg: 'Register failed',
        error: err
      })
    })
  }
  
  static signIn (req,res){
    let input = {
      email: req.body.email,
      password: req.body.password
    }
    user.findOne({
      email: input.email
    }).then(result => {
      console.log('ini result nya', result);
      if(bcrypt.compareSync(input.password, result.password) == false){
        res.status(400)
        .json({
          msg: 'Wrong email or password'
        })
      }
      let payload = {
        _id: result._id,
        email: result.email,
        questions: result.questions,
        answers: result.answers
      }
      jwt.sign(payload, 'secretkey', (err, token) => {
        if (!err) {
          console.log('ini token',token);
          res.status(200)
          .json({
            msg: 'User signed in',
            token: token
          })
        } else {
          res.status(500)
          .json({
            msg: 'Wrong password or email',
            error: err
          })
        }
      })
    }).catch(err => {
      res.status(400)
      .json({
        msg: 'Sign in failed',
        error: err
      })
    })
  }
}

module.exports = User;