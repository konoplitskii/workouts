import  { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext.jsx';

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error('UseWorkoutsContext must be used inside WorkoutContextProvider')
    }

    return context;
};


