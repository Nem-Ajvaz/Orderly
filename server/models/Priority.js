const { Schema, model } = require("mongoose");

const prioritySchema = new Schema({
  zendesk: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  jira: { type: String, required: true, trim: true },
  dateCreated: { type: String, required: true, trim: true },
  customer: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  currentStatus: { type: String, required: true, trim: true },
  sdm: { type: String, required: true, trim: true },
  comment: { type: String, required: true, trim: true },
});

const Priority = model("Priority", prioritySchema);

module.exports = Priority;
