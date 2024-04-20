import React from 'react';
import {useWorkoutsContext} from '../hooks/useWorkoutsContext.js';

const WorkoutDetails = ({ data }) => {

    const {dispatch} = useWorkoutsContext();
    const handleClick = async () => {
        const response = await fetch(`http://localhost:5555/api/workouts/${data._id}`, {
            method: 'DELETE',
        })
        const result = await response.json();

        if (response.ok) {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: result,
            })
        }
    }

    return (
        <div className="workout-details">
            <h4>{data.title}</h4>
            <p><strong>Load (kg):</strong>{data.load}</p>
            <p><strong>Reps (kg):</strong>{data.reps}</p>
            <p>{data.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    );
};

export default WorkoutDetails;
