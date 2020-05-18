const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  commentedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'topic', required: false },
  text: {type: String, require: true},
  date: {type: Date, default: Date.now},
  likers: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false }],
  dislikers: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false }]
});
module.exports = Comment = mongoose.model("comment", CommentSchema);
