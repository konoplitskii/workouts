const { Router } = require('express');
const WorkoutModel = require('../models/WorkoutModel');

const router = Router();

router.get('/workouts', (req,res) => {
    res.json({message: 'GET all workouts'})
})

router.get('/workouts/:id', (req,res) => {
    res.json({message: 'GET single workout'})
})

router.post('/workouts', async (req,res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await WorkoutModel.create({
            title,
            load,
            reps
        });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete('/workouts', (req,res) => {
    res.json({message: 'DELETE a workout'})
})

router.patch('/workouts/:id', (req,res) => {
    res.json({message: 'UPDATE a workout'})
})

module.exports = router;
