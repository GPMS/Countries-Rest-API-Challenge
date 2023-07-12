const BASE_URL = 'https://restcountries.com/v3.1/';

export const getAllCountries = () => `${BASE_URL}all?fields=name,capital,flags,population,region,cca3,altSpellings`;
export const searchByRegion = (region) => `${BASE_URL}region/${region}`;
export const searchByCode = (code) => `${BASE_URL}alpha/${code}`;
export const searchByCodes = (codes) => `${BASE_URL}alpha?codes=${codes.join(',')}`;
