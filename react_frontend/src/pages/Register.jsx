import axios from 'axios';
import { useState } from 'react';
import './Register.css'; // Custom CSS

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register/', form);
            setMessage('Registered successfully! You can now log in.');
        } catch (err) {
            setMessage('Registration failed. Try again.');
        }
    };

    return (
        <div className="register-wrapper d-flex justify-content-center align-items-center">
            <div className="card register-card shadow-lg p-4">
                <h2 className="text-center mb-4">Register</h2>
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
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
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
                            placeholder="Create a password"
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success">
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Already have an account? <a href="/login">Login</a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;
