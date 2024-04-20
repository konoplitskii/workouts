const { Router } = require('express');
const { getAllWorkouts, createWorkout, getSingleWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController');

const router = Router();

router.get('/workouts', getAllWorkouts);
router.get('/workouts/:id', getSingleWorkout);
router.post('/workouts', createWorkout);
router.delete('/workouts/:id', deleteWorkout);
router.patch('/workouts/:id', updateWorkout);

module.exports = router;
