import React, {useEffect, useState} from 'react';
import WorkoutDetails from '../components/WorkoutDetails.jsx';
import WorkoutForm from '../components/WorkoutForm.jsx';
import {useWorkoutsContext} from '../hooks/useWorkoutsContext.js';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();

    const fetchWorkout =  async () => {
        const response = await fetch('http://localhost:5555/api/workouts');
        const data = await response.json();
        if (response.ok) {
            dispatch({
                type: 'SET_WORKOUTS',
                payload: data,
            })
        }
    }

    useEffect(()=> {
        fetchWorkout();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {
                    workouts && workouts.map((workout) => {
                        return <WorkoutDetails key={workout._id} data={workout}/>
                    })
                }
            </div>
            <WorkoutForm/>
        </div>
    );
};

export default Home;
