import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useWorkoutsContext } from './useWorkoutsContext.js';

const useLogout = () => {
    const {dispatch} = useContext(AuthContext);
    const {dispatch: workoutDispatch} = useWorkoutsContext()
    const logout = () => {
        localStorage.removeItem('user');
        dispatch({
            type: 'LOGOUT',
        })

        workoutDispatch({
            type: 'SET_WORKOUTS',
            payload: [],
        })
    }
    return {
        logout
    }
}

export default useLogout;
