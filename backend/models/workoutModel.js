import mongoose from 'mongoose';


const workoutSchema = mongoose.Schema({
      title: {
            type: String, 
            required: true
      },
      reps: {
            type: String, 
            required: true
      },
            load: {
            type: String, 
            required: true
      },
      user_id: {
            type: String,
            required: true
      },
}, { timestamps: true })

const Workout = mongoose.model('Workout', workoutSchema)
export default Workout;