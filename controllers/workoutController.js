const WorkoutModel = require('../models/WorkoutModel');
const mongoose = require('mongoose');

const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id;
        const workouts = await WorkoutModel.find({ user_id }).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (e) {
        res.status(404).json({error: 'No such workouts'});
    }
}


const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await WorkoutModel.findById(id);
    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    return res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;

    const emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }

    if (!load) {
        emptyFields.push('load')
    }

    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length) {
       return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    try {
        const user_id = req.user._id;
        const workout = await WorkoutModel.create({
            title,
            load,
            reps,
            user_id,
        });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await  WorkoutModel.findOneAndDelete({_id: id});
    console.log('workout', workout)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'});
    }

    return res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, load, reps } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await  WorkoutModel.findOneAndUpdate({_id: id}, {
        title: title,
        load: load,
        reps: reps,
    });

    if (!workout) {
        return res.status(404).json({error: 'No update workout'});
    }

    return res.status(200).json(workout);
}

module.exports = {
    getSingleWorkout,
    getAllWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}
