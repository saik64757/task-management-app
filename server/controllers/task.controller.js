const Tasks = require("../models/Tasks");

const getALLTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    if (!tasks) {
      return res.status(404).json(`Tasks not found`);
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTaskbyID = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const task = new Tasks({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).json("All fields are required");
    }
    const newTask = await task.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  getALLTasks,
  deleteTask,
  createTask,
  getTaskbyID,
  updateTask,
};
