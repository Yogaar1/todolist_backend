const Todo = require('../models/todo');

module.exports = {
    getAllTodo: async (req, res) => {
        const user = req.user
            // Use await to wait for the result of the query
            const todos = await Todo.find({userID: user.id}).populate("userID",["id","name"])

            res.json({
                message: "berhasil mendapatkan data todo",
                data: todos
            })
        },

    getTodoById: async (req, res) => {
        try {
            const { id } = req.params;
        
            // Get a todo by ID from the database
            const todo = await Todo.findById(id);
        
            if (!todo) {
              return res.status(404).json({ message: 'Todo not found' });
            }
        
            res.json({ data: todo });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
    },

    createTodo: async (req, res) => {
        try {
            let data = req.body;

            // Use await to wait for the todo to be created
            await Todo.create(data);

            res.json({
                message: "berhasil membuat data todo baru"
            });
        } catch (error) {
            // Handle any errors that occurred during todo creation
            console.error("Error creating todo:", error);
            res.status(500).json({
                message: "Gagal membuat data todo baru",
                error: error.message
            });
        }
    },

    updateTodo: async (req, res) => {
        try {
          const { id } = req.params;
          const { title, description } = req.body;
      
          // Update a todo by ID in the database
          const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
      
          if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
          }
      
          res.json({ message: 'Todo updated successfully', data: updatedTodo });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },
    deleteTodo: async (req, res) => {
        try {
          const { id } = req.params;
      
          // Delete a todo by ID from the database
          const deletedTodo = await Todo.findByIdAndDelete(id);
      
          if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
          }
      
          res.json({ message: 'Todo deleted successfully', data: deletedTodo });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },
      
    deleteAllTodos: async (req, res) => {
        try {
          // Delete all todos from the database
          await Todo.deleteMany();
      
          res.json({ message: 'All todos deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
