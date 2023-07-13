import countriesService from '../countriesAPI';
import { useState, useEffect } from 'react';

export default function useCountries({ region = 'default', code = '' }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCountries() {
            setIsLoading(true);
            try {
                let data = {};
                if (code) {
                    data = await countriesService.getCountry(code);
                } else if (region === 'default') {
                    data = await countriesService.getAllCountries();
                } else {
                    data = await countriesService.getCountriesByRegion(region);
                }
                setData(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCountries();
    }, [region, code]);

    return { data, isLoading, error };
}
