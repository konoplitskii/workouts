import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup.js';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signUp, errors, isLoading} = useSignup();

    const handeSubmit = async (e) => {
        e.preventDefault();
        await signUp(email, password);
    }

    return (
        <form className="signup" onSubmit={handeSubmit}>
            <h3>Sign up</h3>
            <label>Email:</label>
            <input
                disabled={isLoading}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                disabled={isLoading}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading} type="submit">
                Sign up
            </button>
            {
                errors
                && <div className="error">{errors}</div>
            }
        </form>
    );
};

export default Signup;
