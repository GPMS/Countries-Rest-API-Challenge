const BASE_URL = 'https://restcountries.com/v3.1/';

const countriesService = {
    getAllCountries: async () => {
        const res = await fetch(`${BASE_URL}all?fields=name,capital,flags,population,region,cca3,altSpellings`);
        const data = await res.json();
        return data;
    },
    getCountriesByRegion: async (region) => {
        const res = await fetch(`${BASE_URL}region/${region}`);
        const data = await res.json();
        return data;
    },
    getCountry: async (code) => {
        let res = await fetch(`${BASE_URL}alpha/${code}`);
        const [country] = await res.json();
        let borderCountries = null;
        if (country.borders) {
            res = await fetch(`${BASE_URL}alpha?codes=${country.borders}`);
            borderCountries = await res.json();
        }
        return {
            country,
            borderCountries,
        };
    },
};

export default countriesService;
