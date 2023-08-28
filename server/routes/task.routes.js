const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getALLTasks,
  createTask,
  getTaskbyID,
  deleteTask,
  updateTask,
} = require("../controllers/task.controller");

router.get("/", auth, getALLTasks);
router.get("/:id", auth, getTaskbyID);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
