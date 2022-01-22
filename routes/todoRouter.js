const express = require("express");
const Controller = require("../controllers/todoController");
const router = express.Router();

router.get("/", Controller.fetchAllTodos);
router.post("/", Controller.createTodo);
router.delete("/delete", Controller.deleteTodo);
router.put("/complete", Controller.completeTodo);
router.put("/update", Controller.updateTodo);

module.exports = router;
