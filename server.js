require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutsRotes = require('./routes/workouts');
const app = express();

//middleware
app.use(express.json());

// api
app.use('/api', workoutsRotes);

//connect
mongoose.connect(process.env.DATABASE_URL)
    .then(()=> {
        console.log('DB connect')
        app.listen(process.env.PORT, () => {
            console.log(`Server start on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log('DB error', error)
    })


