import axios from 'axios';
import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:8000/api/token/',
                form,
            );
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            setMessage('Login successful!');
        } catch (err) {
            setMessage('Invalid credentials!');
        }
    };

    return (
        <div className="login-wrapper d-flex justify-content-center align-items-center">
            <div className="card login-card shadow-lg p-4">
                <h2 className="text-center mb-4">Login</h2>
                {message && (
                    <div
                        className={`alert ${
                            message.includes('success')
                                ? 'alert-success'
                                : 'alert-danger'
                        }`}
                    >
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            className="form-control"
                            onChange={handleChange}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Don't have an account? <a href="/register">Register</a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Login;
