import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { formatDistanceToNow } from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutDetails = ({workout}) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async() => {
        if(!user) {
            return
        }
        const response = await fetch('/api/workouts/' + workout._id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            } 
        })
        const json = await response.json()
        if(response.ok) {
            console.log('delete workout' , json)
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }
    return (
        <div className="workout_details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            {/* using date fns */}
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
            {/* <p className='created_at'>{workout.createdAt}</p> */}
            <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>
        </div>
    ); 
}
 
export default WorkoutDetails;