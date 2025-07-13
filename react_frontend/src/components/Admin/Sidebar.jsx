import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/Admin_panel/face1.jpg';
import { AdminSlidebar } from '../../services/Admin/slidebarServices';
const Sidebar = () => {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState([]);
    const [user, setUser] = useState({});

    const isActive = (path) => location.pathname === path;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminSlidebar = await AdminSlidebar();
                setSidebarData(adminSlidebar.data.slidebars);
                setUser(adminSlidebar.data.user);
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
    return (
        <nav className="sidebar bg-white border-end shadow-sm">
            <div className="sidebar-profile text-center py-4 border-bottom">
                <img
                    src={profile}
                    alt="Profile"
                    className="rounded-circle mb-2 profile-img"
                />
                <h6 className="fw-bold mb-0">{user?.username}</h6>
                <small className="text-muted">
                    Role: {user == 1 ? 'Super Admin' : 'Seller'}
                </small>
            </div>

            <ul className="nav flex-column p-3">
                {sidebarData.map((item) => (
                    <li
                        key={item.id}
                        className={`nav-item ${
                            isActive(`/${item.slidebar_name.toLowerCase()}`)
                                ? 'active'
                                : ''
                        }`}
                    >
                        <Link className="nav-link" to={item.link}>
                            <i className={`${item.icons} me-2`}></i>{' '}
                            {item.slidebar_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
