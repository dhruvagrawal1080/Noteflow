const Todo = require('../models/todo.model');

exports.createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        const email = req.user.email;
        if (!task || !email) {
            return res.status(400).json({
                success: false,
                message: "Title and Email are required"
            });
        }

        const newTodo = await Todo.create({ email, task });
        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            newTodo
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const email = req.user.email;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const todos = await Todo.find({ email }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'All todos fetched successfully',
            todos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        const email = req.user.email;

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, email },
            { task, completed },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            updatedTodo
        });
    } 
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const email = req.user.email;

        const deletedTodo = await Todo.findOneAndDelete({ _id: id, email });
        if (!deletedTodo) {
            return res.status(404).json({ 
                success: false,
                message: "Todo not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Todo deleted successfully",
            deletedTodo
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            error: err.message
        });
    }
};