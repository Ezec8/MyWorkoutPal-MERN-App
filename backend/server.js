require('dotenv').config()

const express = require('express');
const workoutRoutes = require('./routes/workouts.js');
const mongoose = require('mongoose');

//express app 
const app = express();

//Middleware
app.use(express.json());

app.use((request, response, next) =>{
    console.log(request.path, request.method);
    next();
})

//routes 
app.use('/api/workouts', workoutRoutes);

//connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () =>{
            console.log(`Connected to db & Listening on port ${process.env.PORT}`);
        }) 
    })
    .catch((error) => {console.log(error)})
