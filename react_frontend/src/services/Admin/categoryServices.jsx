import axiosInstance from '../axiosInstance';

export const categoryServices = async (page = 1) => {
    const res = await axiosInstance.get(`/list-category?page=${page}`);
    return res.data;
};
