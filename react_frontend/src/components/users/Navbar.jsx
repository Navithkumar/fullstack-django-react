import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsCart, BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import zeptoLogo from '../../assets/primary-logo.svg';
import './component.css';

function Navbar() {
    const [token, setAccessToken] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        setAccessToken(accessToken);
    }, []);

    return (
        <nav className="navbar-custom shadow-sm sticky-top">
            <div className="container-fluid d-flex align-items-center justify-content-between px-4 py-2">
                <div className="d-flex align-items-center gap-3">
                    <img src={zeptoLogo} alt="logo" className="zepto-logo" />

                    <div className="super-toggle d-flex align-items-center">
                        <span className="super-text">SUPER SAVER</span>
                    </div>

                    <div className="location-selector">
                        <span className="fw-bold">Select Location</span>{' '}
                        <i className="bi bi-caret-down-fill"></i>
                    </div>
                </div>

                <div className="search-bar flex-grow-1 mx-5">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <BiSearch size={20} />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search for over 5000 products"
                        />
                    </div>
                </div>
                <div className="d-flex align-items-center gap-4">
                    <Link
                        to={token ? '/profile' : '/login'}
                        className="text-dark text-center nav-action"
                    >
                        <BsPerson size={24} />
                        <div>{token ? 'Profile' : 'Login'}</div>
                    </Link>

                    <Link
                        to="/cart"
                        className="text-dark text-center nav-action"
                    >
                        <BsCart size={24} />
                        <div>Cart</div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
