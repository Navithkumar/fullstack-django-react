import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonModal from '../../components/Common/modal';
import CommonPagination from '../../components/Common/Pagination';
import Table from '../../components/Common/Table';
import {
    categoryServices,
    SaveCategory,
} from '../../services/Admin/categoryServices';

function Category() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [pagination, setPagination] = useState({
        next: null,
        previous: null,
        count: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);

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

    const handleFormSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('category_name', data.category_name);
            if (
                data.category_image &&
                data.category_image instanceof FileList &&
                data.category_image.length > 0
            ) {
                formData.append('category_image', data.category_image[0]);
            }
            await SaveCategory(formData);
            alert('Category saved successfully!');
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error saving category:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            } else {
                alert('Failed to save the category. Please try again.');
            }
        }
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
            console.error('Error fetching categories:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            } else {
                alert('Failed to fetch categories. Please try again.');
            }
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [navigate, currentPage]); // Added currentPage to dependency array to re-fetch on page change

    return (
        <>
            <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
            >
                + Add Category
            </button>
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
        </>
    );
}

export default Category;
