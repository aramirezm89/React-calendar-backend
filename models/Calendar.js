const {Schema,model} = require('mongoose');

const CalendarSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
});

CalendarSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});
module.exports = model('Calendar',CalendarSchema);