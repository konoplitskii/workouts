import React, { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails.jsx';
import WorkoutForm from '../components/WorkoutForm.jsx';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const fetchWorkout =  async () => {
        const response = await fetch('http://localhost:5555/api/workouts', {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({
                type: 'SET_WORKOUTS',
                payload: data,
            })
        }
    }

    useEffect(()=> {
        if(user) {
            fetchWorkout();
        }
    }, [user]);

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
