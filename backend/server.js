// first create folder and folder for backend
// in console inside backend folder type npm init -y
// then type npm install express
// install npm install nodemon -g
// add "dev": "nodemon server.js in package.json script"
// npm install dotenv
//npm install mongoose


import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import workoutRoutes from './routes/workouts.js';
dotenv.config()

//express app
const app = express();

//middleware
app.use(express.json())
app.use((req, res, next) => {
      console.log(req.path, req.method)
      next()
})
//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
      .then(() => {
//listen for request when connected to database first
app.listen(process.env.PORT, () => {
      console.log('Connected to database active on', process.env.PORT)
      }); 
})
.catch((error) => {
      console.log(error)
});


