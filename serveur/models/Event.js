const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  date_event: {
    type: Date
  },
  picture: {
    type: String
  }
});
module.exports = Event = mongoose.model("event", EventSchema);
