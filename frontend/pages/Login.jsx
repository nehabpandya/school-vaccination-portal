import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Correct import for useNavigate


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulated login check (hardcoded for now)
        if (username === 'admin' && password === 'password') {
            // Simulate setting a token or login state
            localStorage.setItem('isLoggedIn', true);
            navigate('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };
    return (
        <div className="background-container d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card rounded m-4 p-3 custom-opacity rounded shadow-lg">
                            <h3 className="m-4 text-center">School Vaccination Portal Login</h3>
                            <form onSubmit={handleLogin}>
                                <div className="m-4">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="m-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="m-5">
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </div>
                            </form>
                            <hr className="my-4 text-secondary" />
                            <div className="text-center">
                                <p className="mb-0 text-secondary">Crafted by Neha ❤️</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
