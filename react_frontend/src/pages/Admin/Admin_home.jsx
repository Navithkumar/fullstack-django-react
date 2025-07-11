// AppLayout.jsx
import { useEffect } from 'react';
import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';
import '../Admin/Admin_home.css';

const AppLayout = ({ children }) => {
    useEffect(() => {
        document.title = 'Dashboard - Admin Panel';
    }, []);
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="content-wrapper">{children}</div>
            </div>
        </div>
    );
};

export default AppLayout;
