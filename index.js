const express = require('express');
const mongoose = require('mongoose');
const User = require('./User')

const connectDB = async () => {
    try {
        const dbconnected = await mongoose.connect('mongodb://localhost:27017/Study')
        if (dbconnected) {
            console.log('DB connection Successful')
        } else {
            console.log('DB connection  Not Successful')
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

// const createRandomUsers = async () => {
//   const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Harry', 'Ivy', 'Jack'];
//   const uniqueIds = new Set();

//   while (uniqueIds.size < 20) {
//     const name = names[Math.floor(Math.random() * names.length)];
//     const age = Math.floor(Math.random() * 30) + 20; 
//     const uniqueId = Math.random().toString(36).substring(2); 

//     if (!uniqueIds.has(uniqueId)) {
//       const newUser = new User({
//         name,
//         age,
//         uniqueId,
//       });

//       await newUser.save();
//       uniqueIds.add(uniqueId);
//     }
//   }

//   console.log('Users created successfully');
// };

// createRandomUsers();

const server = express();
const PORT = 8000;

server.get('/health', (req, res) => {
    res.json('It is good working');
})

server.use(express.json());

server.post('/add-user',  async (req, res) => {
try {
    const data = req.body;
    const user = await User.create(data);
    res.json(user);
} catch (error) {
    throw new Error('user not created');
}
})

server.get('/user/:Id',  async (req, res) => {
    try {
        const userId = req.params.Id;
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        throw new Error('user not created');
    }
    })

connectDB();
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//this is first
