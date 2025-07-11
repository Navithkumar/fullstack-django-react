import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/api/v1/login',
                form,
            );
            localStorage.setItem('access', res.data.data.access);
            localStorage.setItem('refresh', res.data.data.refresh);
            setToast({
                show: true,
                message: 'Login successful!',
                type: 'success',
            });
            navigate('/');
        } catch (err) {
            setToast({
                show: true,
                message: 'Invalid credentials!. Try again.',
                type: 'danger',
            });
        }
    };

    useEffect(() => {
        document.title = 'Login';
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ ...toast, show: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="login-wrapper d-flex justify-content-center align-items-center">
            <div className="card login-card shadow-lg p-4">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
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
                {toast.show && (
                    <div
                        className="position-fixed bottom-0 end-0 p-3"
                        style={{ zIndex: 9999 }}
                    >
                        <div
                            className={`toast show text-white bg-${toast.type}`}
                            role="alert"
                        >
                            <div className="toast-body">{toast.message}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
