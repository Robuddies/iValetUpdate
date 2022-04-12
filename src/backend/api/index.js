import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002/api',
});

//
export const getAllParking = () => api.get(`/all`);
export const getNearestEmpty = () => api.get('/nearest_empty');
export const getNearestEmptyHandicap = () => api.get(`/nearest_empty_handicap`);
export const getLotInfoById = (id) => api.get(`/lot/${id}`);
export const getLotInfoByLicence = (id) => api.get(`/licence_plate/${id}`);
export const getFeeByLicence = (id) => api.get(`/calculate_fee/${id}`);

export const exitLotByLicence = (id) => api.put(`/exit/${id}`);
export const enterLotByLicence = (id, lp) => api.put(`/park/${id}/${lp}`);

const apis = {
    getAllParking,
    getNearestEmpty,
    getNearestEmptyHandicap,
    getLotInfoById,
    getLotInfoByLicence,
    getFeeByLicence,

    exitLotByLicence,
    enterLotByLicence,
};

export default apis;
