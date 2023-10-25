
// -----and useState hook will be deactivated when using useWorkoutsContext
//import { useState} from 'react'
import { useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext';

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
// ---instead use this variable when using context---//
    const { workouts, dispatch } = useWorkoutsContext()
    const {user} = useAuthContext() 

    //------if useWorkoutsContext we don't need this here------//    
    // const [workouts, setWorkouts] = useState(null)
    
    useEffect(()=> {
    const fetchWorkouts = async () => {
        //disable this if using context  
        // const response = await fetch('/api/workouts')
        // const json = await response.json()

        const response = await fetch('/api/workouts', {
            headers: { 
            'Authorization' : `Bearer ${user.token}` 
            }
        })
        const json = await response.json()

        if (response.ok) {
            //---------and this if useWorkoutsContext is using------//
            //setWorkouts(json)
        // ---use this when using context---//
            dispatch({type: "SET_WORKOUTS", payload: json})
        }
    }  
    if(user) {
        fetchWorkouts()
}
},[user, dispatch])
    return (
        <div className="home">
            <div className="workouts">
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
            </div>
               <WorkoutForm />    
        </div>
    );
}
 
export default Home;