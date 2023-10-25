import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutDispatch } = useWorkoutsContext()


const logout = async () => {
//remove user from storage
    localStorage.removeItem('user')
//update logout action
    dispatch({type: 'LOGOUT'})
    workoutDispatch({type: 'SET_WORKOUTS', payload: null})
    }
    return { logout }
}

 
