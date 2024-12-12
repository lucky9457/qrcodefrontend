import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css" // Using the same CSS for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/auth/register', { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('User registered:', response.data);
            setSuccessMessage('User registered successfully');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful registration
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Error registering user. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className='form' onSubmit={handleRegister}>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default Register;
