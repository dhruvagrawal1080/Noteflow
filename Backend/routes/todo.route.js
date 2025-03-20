const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post("/createTodo", auth, createTodo);
router.get("/getTodos", auth, getTodos);
router.put("/updateTodo/:id", auth, updateTodo);
router.delete("/deleteTodo/:id", auth, deleteTodo);

module.exports = router;