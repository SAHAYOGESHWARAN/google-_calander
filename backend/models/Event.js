const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  location: String,
  time: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
