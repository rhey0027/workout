import express from 'express';
import {
      createWorkout,
      getWorkouts,
      getWorkout,
      deleteWorkout,
      updateWorkout
} from '../controllers/workoutController.js';

import requireAuth from '../middleware/requireAuth.js'
const router = express.Router()

//require auth for all the routes
router.use(requireAuth);

//GET all
router.get('/', getWorkouts)

//GET a single file
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a new workout
router.delete('/:id', deleteWorkout)

//UPDATE OR PATCH a new workout
router.patch('/:id', updateWorkout)


export default router;