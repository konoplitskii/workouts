import React, { useState } from 'react';
import useLogin from '../hooks/useLogin.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, errors} = useLogin();

    const handeSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <form className="login" onSubmit={handeSubmit}>
            <h3>Login</h3>
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
                Login
            </button>
            {
                errors
                && <div className="error">{errors}</div>
            }
        </form>
    );
};

export default Login;
