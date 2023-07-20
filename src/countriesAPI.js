import axios from 'axios';

const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1/',
    timeout: 1000,
});

const FIELDS = 'name,capital,flags,population,region,cca3,altSpellings';

const countriesService = {
    getAllCountries: async () => {
        const res = await api.get(`/all?fields=${FIELDS}`);
        return res.data;
    },
    getCountriesByRegion: async (region) => {
        const res = await api.get(`/region/${region}?fields=${FIELDS}`);
        return res.data;
    },
    getCountry: async (code) => {
        const [country] = await api.get(`/alpha/${code}`).data;
        let borderCountries = country.borders ? await api.get(`/alpha?codes=${country.borders}`).data : null;
        return {
            country,
            borderCountries,
        };
    },
};

export default countriesService;
