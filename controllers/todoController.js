const mongoose = require("mongoose");
const Todo = require("../models/todo");

exports.fetchAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ priority: 1 });
    res.json(todos);
  } catch {
    res.status(500).json({ success: false }).send();
  }
};

exports.createTodo = async (req, res) => {
  const { description, priority } = req.body;
  const todo = new Todo({ description: description, priority: priority });
  try {
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ success: false }).send();
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.body.id;
  try {
    const result = await Todo.findByIdAndDelete(id);
    res.json({ result });
  } catch (err) {
    res.status(410).json({ success: false }).send();
  }
};

exports.completeTodo = async (req, res) => {
  const id = req.body.id;
  const todo = await Todo.findById(id);
  try {
    todo.status = !todo.status;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ success: false }).send();
  }
};

exports.updateTodo = async (req, res) => {
  const { id, description, priority } = req.body;
  console.log(description, id, priority);
  const todo = await Todo.findById(id);
  try {
    todo.description = description;
    todo.priority = priority;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ success: false }).send();
  }
};
