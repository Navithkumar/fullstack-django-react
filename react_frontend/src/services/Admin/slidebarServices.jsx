import axiosInstance from '../axiosInstance';

export const AdminSlidebar = async () => {
    const res = await axiosInstance.get('/admin-slidebar');
    return res.data;
};


