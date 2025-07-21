import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    role: yup.number().required('Role is required'),
});
