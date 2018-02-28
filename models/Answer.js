const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// $Answer=
//  --Answer: String, Required
//  --User: ObjectId, ref:User
//  --UpVotes: [ObjectId, ref:User]
//  --DownVotes: [ObjectId, ref:User]

const answerSchema = new Schema({
  answer: {
    type: String,
    required: [true, "Contribute to the masses"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;