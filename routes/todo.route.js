const express = require('express');
const { getAllTodo, getTodoById, createTodo, updateTodo, deleteTodo, deleteAllTodos } = require('../controllers/todo.controller.');
const verifyToken = require('../middleware/auth');
const route = express.Router()


route.get("/",verifyToken, getAllTodo);
route.get("/:id", getTodoById);
route.post("/", createTodo);
route.post("/:id", updateTodo);
route.post("/:id", deleteTodo);
route.post("/", deleteAllTodos);


module.exports = route;