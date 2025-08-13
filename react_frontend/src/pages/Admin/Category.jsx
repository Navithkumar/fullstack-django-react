import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Common/Table';
import { categoryServices } from '../../services/Admin/categoryServices';
function Category() {
    const tableHeaders = [
        'S.NO',
        'Category Name',
        'Category Image',
        'Status',
        'Action',
    ];

    const fields = [
        {
            name: 'category_name',
            label: 'Category Name',
            type: 'text',
            validation: { required: 'Category Name is required' },
        },
        {
            name: 'category_image',
            label: 'Category Image',
            type: 'file',
            validation: { required: 'Category image is required' },
        },
    ];

    const handleSubmit = (data) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (data[key] instanceof FileList) {
                    if (data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    }
                } else {
                    formData.append(key, data[key]);
                }
            }
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
        } catch (error) {}
    };

    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const [pagination, setPagination] = useState(null);

    const fetchData = async () => {
        try {
            const response = await categoryServices();
            setCategoryData(response.data || []);
            setPagination(response.pagination || null);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            } else {
                alert('Failed to fetch categories');
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    return (
        <>
            <Table
                headers={tableHeaders}
                data={categoryData}
                pagination={pagination}
                edit={true}
            />
        </>
    );
}

export default Category;
