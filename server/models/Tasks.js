const mongoose = require("mongoose");

let TasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
});

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks;
