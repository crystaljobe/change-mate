import { api } from "../utilities";

// Fetches countries from backend
export const getCountries = async () => {
    const response = await api.get('countries/');
    let countries = response.data;
    return countries;
};

// Fetches states from backend
export const getStates = async (countryName) => {
    const response = await api.get(`states/${countryName}`);
    let states = response.data;
    return states;
};

// Fetches cities from backend
export const getCities = async (stateName) => {
    const response = await api.get(`cities/${stateName}`);
    let cities = response.data;
    return cities;
};