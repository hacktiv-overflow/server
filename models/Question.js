const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// $Questions=
//  --Question: String, Required
//  --User: ObjectId, ref:User
//  --Answers: [ObjectId, ref:Answer]
//  --UpVotes: [ObjectId, ref:User]
//  --DownVotes: [ObjectId, ref:User]

const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, "Don't be afraid to ask"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps:true
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;