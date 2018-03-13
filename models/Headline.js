var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
  saved: {
    type: Boolean,
    required: true,
    default: false
  }
});

var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;
