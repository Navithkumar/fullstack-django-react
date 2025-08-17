import axiosInstance from '../axiosInstance';

export const categoryServices = async (page = 1) => {
    const res = await axiosInstance.get(`/list-category?page=${page}`);
    return res.data;
};

export const SaveCategory = async (formData) => {
    const res = await axiosInstance.post('/category', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};
