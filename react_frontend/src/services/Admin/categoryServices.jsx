import axiosInstance from '../axiosInstance';

export const categoryServices = async () => {
    const res = await axiosInstance.get('/list-category');
    return res.data;
};
