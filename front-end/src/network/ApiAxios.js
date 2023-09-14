import axios from 'axios';
import config from "../config";

const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
    config.headers.ContentType = 'application/json';
    return config;
});

export const fetchAllCribs = async () => (
    await instance.get('cribs',{})
);

export const getCribById = async (id) => (
    await instance.get(`cribs/${id}`)
);

export const createNewCrib = async (data) => (
    await instance.post('cribs',{data})
);

export const updateCrib = async (id, data) => (
    await instance.put(`cribs/${id}`, {data})
);

export const deleteCrib = async (id) => (
    await instance.delete(`cribs/${id}`)
);