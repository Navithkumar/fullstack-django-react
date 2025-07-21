import axiosInstance from '../axiosInstance';

export const slidebar = async () => {
    const res = await axiosInstance.get('/slidebar');
    return res.data;
};

export const userListing = async () => {
    try {
        const res = await axiosInstance.get('/list-users/', {
            params: {
                page: 1,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const userEdit = async (id) => {
    try {
        const res = await axiosInstance.get(`/edit-users/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error Edit users:', error);
    }
};

export const userDelete = async (id) => {
    try {
        const res = await axiosInstance.get(`/delete-users/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error delete users:', error);
    }
};
