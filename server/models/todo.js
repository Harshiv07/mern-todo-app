const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
