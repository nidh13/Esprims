const mongoose = require("mongoose");
const TopicSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    createdAt: {type: Date},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment', required: false }],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
    categorie: {type: String, required: true, enum: ["Gameplay", "Bugs","Comptetions", "Claims", "Others"]},

});
module.exports = Topic = mongoose.model("topic", TopicSchema);
