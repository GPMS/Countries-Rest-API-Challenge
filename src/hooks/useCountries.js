import { getAllCountries, searchByRegion, searchByCodes } from '../config';
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
                    let res = await fetch(searchByCodes([code]));
                    const [country] = await res.json();
                    data.country = country;
                    let borderCountries = null;
                    if (country.borders) {
                        res = await fetch(searchByCodes(country.borders));
                        borderCountries = await res.json();
                    }
                    data.borderCountries = borderCountries;
                } else {
                    let url;
                    if (region !== 'default') {
                        url = searchByRegion(region);
                    } else {
                        url = getAllCountries();
                    }
                    const res = await fetch(url);
                    data = await res.json();
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
