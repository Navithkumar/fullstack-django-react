import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonModal from '../../components/Common/modal';
import CommonPagination from '../../components/Common/Pagination';
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
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [pagination, setPagination] = useState({
        next: null,
        previous: null,
        count: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);

    const handleFormSubmit = (data) => {
        console.log('Form submitted:', data);
        // API call to save category
        //call create api
    };

    const fetchData = async (page = 1) => {
        try {
            const response = await categoryServices(page);
            setCategoryData(response.data || []);
            setPagination(
                response.pagination || { next: null, previous: null, count: 0 },
            );
            setCurrentPage(page);
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
        fetchData(currentPage);
    }, [navigate]);

    return (
        <>
            <Table
                headers={tableHeaders}
                data={categoryData}
                pagination={pagination}
                edit={true}
            />
            <CommonPagination
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={fetchData}
                pageSize={5}
            />
            <CommonModal
                title="Add Category"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fields={fields}
                onSubmit={handleFormSubmit}
            />
            <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
            >
                + Add Category
            </button>
        </>
    );
}

export default Category;
