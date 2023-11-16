const User = require('../models/user');
const Todo = require('../models/todo'); // Make sure to import the Todo model

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();

            res.json({message: "berhasil mendapatkan data user", data: users});
        } catch (error) {
            console.error("Error fetching users:", error);
            res
                .status(500)
                .json({message: "Gagal mendapatkan data user", error: error.message});
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;

            const user = await User.findById(userId);

            // Check if the user with the given ID exists
            if (!user) {
                return res
                    .status(404)
                    .json({message: 'User not found'});
            }

            // Return the user data
            res.json({message: 'User found', data: user});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({message: 'Internal Server Error'});
        }
    },
    getUserTodos: async (req, res) => {
        try {
            const {id} = req.params;
            const todos = await Todo.find({userID: id});
            // ... rest of your code
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .json({error: 'Internal Server Error'});
        }
    },
    createUser: async (req, res) => {
        let data = req.body;

        await User.create(data);

        res.json({message: "berhasil membuat data user baru"});
    }
};
