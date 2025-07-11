import {
    FaAlignRight,
    FaBars,
    FaBell,
    FaEnvelope,
    FaPowerOff,
    FaSearch,
} from 'react-icons/fa';
import profileImage from '../../assets/Admin_panel/face1.jpg';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar shadow-sm bg-white sticky-top w-100 px-4 py-2 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
                <span className="navbar-brand fw-bold text-purple d-flex align-items-center mb-0">
                    <i className="mdi mdi-layers mdi-24px me-1 text-purple"></i>{' '}
                    Purple
                </span>
                <FaBars className="fs-5 text-secondary cursor-pointer" />
                <div className="d-flex align-items-center border rounded search-box px-2">
                    <FaSearch className="text-muted" />
                    <input
                        type="text"
                        placeholder="Search projects"
                        className="form-control border-0 shadow-none ms-2"
                    />
                </div>
            </div>

            <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center">
                    <img
                        src={profileImage}
                        alt="profile"
                        className="rounded-circle me-2"
                        width="36"
                        height="36"
                    />
                    <div>
                        <span className="fw-medium">David Greymaax</span>
                        <i className="mdi mdi-chevron-down text-purple ms-1"></i>
                    </div>
                </div>
                <FaEnvelope className="icon-btn text-warning position-relative" />
                <FaBell className="icon-btn text-danger position-relative" />
                <FaPowerOff className="icon-btn text-muted" />
                <FaAlignRight className="icon-btn text-muted" />
            </div>
        </nav>
    );
};

export default Navbar;
