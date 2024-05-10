import React, { useState } from 'react';
import {useWorkoutsContext} from '../hooks/useWorkoutsContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();


    const handleSubmit = async (e) => {
      e.preventDefault();

        if(!user) {
            setError('You must be logged in');
        }

        const workout = {
            title,
            reps,
            load,
        }
        const response = await fetch('http://localhost:5555/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json,
            })
            console.log('new workout add', json)
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exsersize Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps (in kg):</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
