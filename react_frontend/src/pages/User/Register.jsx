import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import './Register.css';
const Register = () => {
    const [role, setRole] = useState('customer');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        phone_number: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    });
    useEffect(() => {
        document.title = 'Register';
    }, []);

    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            role,
            username: form.username,
            email: form.email,
            password: form.password,
            phone_number: form.phone_number,
            address: {
                street: form.street,
                city: form.city,
                state: form.state,
                postal_code: form.postal_code,
                country: form.country,
            },
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/v1/register', payload);
            setToast({
                show: true,
                message: `${
                    role.charAt(0).toUpperCase() + role.slice(1)
                } registered successfully!`,
                type: 'success',
            });
            navigate('/login');
        } catch {
            setToast({
                show: true,
                message: 'Registration failed. Try again.',
                type: 'danger',
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="register-wrapper d-flex justify-content-center align-items-start">
                <div className="card register-card shadow-lg p-4 w-100">
                    <h3 className="text-center mb-4">Create an Account</h3>

                    {/* Role Toggle Buttons */}
                    <div className="btn-group w-100 mb-4" role="group">
                        <button
                            className={`btn ${
                                role === '2'
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                            }`}
                            onClick={() => setRole('2')}
                            type="button"
                        >
                            Customer
                        </button>
                        <button
                            className={`btn ${
                                role === '3'
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                            }`}
                            onClick={() => setRole('3')}
                            type="button"
                        >
                            Seller
                        </button>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                name="username"
                                className="form-control"
                                onChange={handleChange}
                                required
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
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                name="phone_number"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <h5 className="mt-4 mb-3">Address</h5>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Street</label>
                                <input
                                    name="street"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">City</label>
                                <input
                                    name="city"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">State</label>
                                <input
                                    name="state"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">
                                    Postal Code
                                </label>
                                <input
                                    name="postal_code"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-12">
                                <label className="form-label">Country</label>
                                <input
                                    name="country"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">
                                Register as{' '}
                                {role === '2' ? 'Customer' : 'Seller'}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <small>
                            Already have an account? <a href="/login">Login</a>
                        </small>
                    </div>

                    {/* Toast */}
                    {toast.show && (
                        <div
                            className="toast-container position-fixed bottom-0 end-0 p-3"
                            style={{ zIndex: 9999 }}
                        >
                            <div
                                className={`toast align-items-center text-white bg-${toast.type} show`}
                                role="alert"
                            >
                                <div className="d-flex">
                                    <div className="toast-body">
                                        {toast.message}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white me-2 m-auto"
                                        onClick={() =>
                                            setToast({
                                                show: false,
                                                message: '',
                                                type: '',
                                            })
                                        }
                                    ></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Register;
