import { useState } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    //--for context--//
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])



    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You need to be logged in')
            return
        }
        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', { 
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)

        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: "CREATE_WORKOUT", payload:json})
        }
    }
    return (
      <form className="create" id="create" onSubmit={handleSubmit}>
        <h3>New Workout</h3>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load (in kg): </label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Repetition</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}
 
export default WorkoutForm;