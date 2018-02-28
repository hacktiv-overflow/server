const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// $User=
//  --Email: String, Required
//  --Password: String, Required
//  --Questions: [ObjectId, ref:Question]
//  --Answers: [ObjectId, ref:Answer]

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "You need email to register/login"]
  },
  password: {
    type: String,
    required: [true, "Protect your account with password"]
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]
},{
  timestamps:true
});

var User = mongoose.model('User', userSchema);

module.exports = User;