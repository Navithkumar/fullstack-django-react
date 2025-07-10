import axiosInstance from './axiosInstance';

export const slidebar = async () => {
    const res = await axiosInstance.get('/slidebar');
    return res.data;
};

