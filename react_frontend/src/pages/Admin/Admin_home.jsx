// AppLayout.jsx
import { useEffect, useState } from 'react';
import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';
import Cart from '../../pages/Admin/Cart';
import Category from '../../pages/Admin/Category';
import Dashboard from '../../pages/Admin/Dashboard';
import Orders from '../../pages/Admin/Orders';
import Products from '../../pages/Admin/Products';
import Users from '../../pages/Admin/Users';
import '../Admin/Admin_home.css';

const COMPONENTS = {
    Users,
    Products,
    Orders,
    Category,
    Cart,
    Dashboard,
};

const AppLayout = () => {
    const [activeComponent, setActiveComponent] = useState('Dashboard');

    const ActiveComponent = COMPONENTS[activeComponent] || Dashboard;

    useEffect(() => {
        document.title = 'Dashboard - Admin Panel';
    }, []);
    return (
        <div className="app">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="main-content">
                <Navbar />
                <div className="content-wrapper">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
