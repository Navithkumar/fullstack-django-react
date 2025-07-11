import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/User/Home';
import Login from './pages/User/Login';
import Profile from './pages/User/Profile';
import Register from './pages/User/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
