import { useState } from 'react';
import { useAuthContext } from './useAuthContext.js';

export const useSignup = () => {
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password) => {
        setIsLoading(true);
        setErrors(null);

        const response = await fetch('http://localhost:5555/api/user/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setErrors(data.error);
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(
                {
                    type: 'LOGIN',
                    payload: data
                }
            );
            setIsLoading(false);
        }
    }

    return {
        signUp,
        isLoading,
        errors,
    }
};


