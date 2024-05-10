const { Router } = require('express');
const { getAllWorkouts, createWorkout, getSingleWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = Router();


//require auth for all workout routes
// router.use(requireAuth);

router.get('/workouts',requireAuth, getAllWorkouts);
router.get('/workouts/:id',requireAuth, getSingleWorkout);
router.post('/workouts',requireAuth, createWorkout);
router.delete('/workouts/:id',requireAuth, deleteWorkout);
router.patch('/workouts/:id',requireAuth, updateWorkout);

module.exports = router;
