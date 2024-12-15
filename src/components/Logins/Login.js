import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import "./Login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to a protected route or dashboard
        }
    }, [navigate]);

    const handleLogin = async (e) => {



        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('/auth/login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token); // Store the JWT token in local storage
            navigate('/'); // Redirect to the dashboard or any other protected route
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid username or password. Please try again.');
        } finally {
            setIsLoading(false); // Stop the loader
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">

                    <label htmlFor="username" className="label">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={20} /> // Show loader when loading
                    ) : (
                        'Login'
                    )}
                </button>
                <p>Dont have an account? <Link to="/register">Register</Link></p>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
