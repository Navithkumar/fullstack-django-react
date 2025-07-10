import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { slidebar } from '../services/userService';
import './Profile.css'; // for custom styles

function SidebarProfile() {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await slidebar();
                setUser(res.data.user);
                setItems(res.data.slidebars);
            } catch (error) {
                console.error('Sidebar fetch failed:', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('access');
                    navigate('/login');
                }
            }
        };
        fetchData();
    }, [navigate]);

    if (!user || items.length === 0) return <p>Loading...</p>;

    return (
        <>
            <Navbar />

            <div className="sidebar-container">
                <div className="sidebar-profile shadow-sm bg-white">
                    {/* User Info */}
                    <div className="text-center mb-4">
                        <h6 className="mb-1">{user.username}</h6>
                        <small className="text-muted">
                            {user.phone_number}
                        </small>
                    </div>

                    {/* Get Daily */}
                    <div className="bg-success bg-opacity-10 p-3 rounded mb-4 text-center">
                        <p className="mb-1 fw-bold text-success small">
                            You could save ₹500/month
                        </p>
                        <button className="btn btn-warning btn-sm w-100">
                            Get Daily
                        </button>
                    </div>

                    {/* Wallet Block */}
                    <div className="mb-4 text-center p-3 bg-light rounded">
                        <h6 className="fw-bold small">
                            Zepto Cash & Gift Card
                        </h6>
                        <p className="mb-2 text-muted">Available Balance: ₹0</p>
                        <button className="btn btn-dark btn-sm w-100">
                            Add Balance
                        </button>
                    </div>

                    {/* Sidebar Menu */}
                    <ul className="list-unstyled menu-list">
                        {items.map((item) => {
                            const showSliderbar = item.role.includes(user.role);
                            if (showSliderbar) {
                                const route = `/${item.slidebar_name
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}`;
                                const isActive = location.pathname === route;
                                return (
                                    <li key={item.id} className="mb-2">
                                        <Link
                                            to={route}
                                            className={`d-flex align-items-center gap-2 px-3 py-2 sidebar-link rounded ${
                                                isActive ? 'active' : ''
                                            }`}
                                        >
                                            <i
                                                className={`${item.icons} text-secondary`}
                                            ></i>
                                            <span>
                                                {item.slidebar_name.trim()}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SidebarProfile;
