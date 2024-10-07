import axios from 'axios';
import { notifications } from '@mantine/notifications';

const API_KEY = import.meta.env.VITE_API_KEY;
const URL = 'https://api.recruitly.io/api';

const catchAsync = async (cb: () => {}) => {
    try {
        return await Promise.resolve(cb());
    } catch (err) {
        notifications.show({
            title: 'Error',
            message: 'Something went wrong',
        });
    }
};

export const listCompany = async () => {
    return await catchAsync(async () => {
        const res = await axios.get(`${URL}/company?apiKey=${API_KEY}`);

        return res?.data?.data;
    });
};

export const updateCompany = async (body = {}) => {
    return await catchAsync(async () => {
        const res = await axios.post(`${URL}/company?apiKey=${API_KEY}`, body);

        return res?.data;
    });
};
