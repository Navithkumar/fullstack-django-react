import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profile from '../../assets/Admin_panel/face1.jpg';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('');

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? '' : menu);
    };

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <nav className="sidebar bg-white border-end shadow-sm">
            <div className="sidebar-profile text-center py-4 border-bottom">
                <img
                    src={profile}
                    alt="Profile"
                    className="rounded-circle mb-2 profile-img"
                />
                <h6 className="fw-bold mb-0">David Grey. H</h6>
                <small className="text-muted">Project Manager</small>
            </div>

            <ul className="nav flex-column p-3">
                <li
                    className={`nav-item ${isActive('/dashboard') && 'active'}`}
                >
                    <Link className="nav-link" to="/dashboard">
                        <i className="bi bi-house-door me-2"></i> Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <div
                        className="nav-link collapsible"
                        onClick={() => toggleMenu('basicUI')}
                    >
                        <i className="bi bi-puzzle me-2"></i> Basic UI
                        <i className="bi bi-chevron-down float-end"></i>
                    </div>
                    {activeMenu === 'basicUI' && (
                        <ul className="nav flex-column ms-3">
                            <li>
                                <Link
                                    to="/basic-ui/buttons"
                                    className="nav-link"
                                >
                                    Buttons
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/basic-ui/typography"
                                    className="nav-link"
                                >
                                    Typography
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/form-elements">
                        <i className="bi bi-ui-checks-grid me-2"></i> Form
                        Elements
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/tables">
                        <i className="bi bi-table me-2"></i> Tables
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/charts">
                        <i className="bi bi-bar-chart-line me-2"></i> Charts
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
