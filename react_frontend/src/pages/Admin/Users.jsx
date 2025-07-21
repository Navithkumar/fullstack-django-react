import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressModal from '../../components/Admin/addressModal';
import Table from '../../components/Common/Table';
import { userListing } from '../../services/User/userService';

function Users() {
    const [userData, setUserData] = useState([]);
    const [userPagination, setUserPagination] = useState();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const tableHeaders = ['S.NO', 'Username', 'Email', 'Role', 'Address'];

    const fetchData = async () => {
        try {
            const response = await userListing();
            setUserData(response.data);
            setUserPagination(response.pagination);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            } else {
                alert('Failed to fetch users');
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const viewAddress = (address) => {
        setSelectedAddress(address);
        setShowModal(true);
    };

    return (
        <>
            <div>
                <Table
                    headers={tableHeaders}
                    data={userData}
                    pagination={userPagination}
                    edit="false"
                    viewAddress={viewAddress}
                />
                <AddressModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    address={selectedAddress}
                />
            </div>
        </>
    );
}

export default Users;
