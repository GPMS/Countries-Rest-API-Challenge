import { useId, useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';

import CountryCard from './components/CountryCard';

const API = 'https://restcountries.com/v3.1/';

export default function CountriesFilter({ setCountryCode }) {
    const [filterText, setFilterText] = useState('');
    const [filterRegion, setFilterRegion] = useState('default');

    const [countries, setCountries] = useState(null);

    useEffect(() => {
        async function fetchCountries() {
            setCountries(null);
            const endpoint = filterRegion === 'default' ? 'all' : `region/${filterRegion.toLowerCase()}`;
            try {
                let res = await fetch(`${API}${endpoint}`);
                const countries = await res.json();
                setCountries(countries);
            } catch (e) {
                console.log(e);
            }
        }

        fetchCountries();
    }, [filterRegion]);

    function canShow(country) {
        if (filterText) {
            let names = country.altSpellings ? [country.name.official, ...country.altSpellings] : [country.name];
            if (!names.some((name) => name.toLowerCase().includes(filterText.toLowerCase()))) {
                return false;
            }
        }
        return true;
    }

    let shownCountriesCount = 0;
    if (countries) {
        shownCountriesCount = countries.reduce((prevValue, country) => {
            return canShow(country) ? prevValue + 1 : prevValue;
        }, 0);
    }

    const searchId = useId();

    return (
        <main className="container mx-auto flex h-auto grow flex-col px-4 pt-7 lg:px-0">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:justify-between">
                <div className="relative">
                    <input
                        id={searchId}
                        onInput={(e) => {
                            setFilterText(e.target.value);
                        }}
                        className="w-full rounded p-4 pl-[2rem] text-sm drop-shadow focus-visible:border-violet-800 dark:bg-dark-bg-front dark:text-white lg:w-[500px]"
                        type="text"
                        name="text"
                        placeholder="Search for a country..."
                    />
                    <label htmlFor={searchId} className="absolute left-[.5rem] translate-y-[100%] scale-125">
                        <MdSearch title="Search" />
                    </label>
                </div>
                <select
                    className="block rounded bg-white p-2 dark:border-black dark:bg-dark-bg-front"
                    onChange={(e) => {
                        setFilterRegion(e.target.value);
                    }}
                    name="region"
                >
                    <option value="default">--Filter by Region--</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            {(countries &&
                (shownCountriesCount > 0 ? (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                        {countries.map((country, index) => {
                            if (canShow(country))
                                return (
                                    <CountryCard
                                        key={index}
                                        id={index}
                                        country={country}
                                        setCountryIndex={setCountryCode}
                                    />
                                );
                            else {
                                return null;
                            }
                        })}
                    </div>
                ) : (
                    <div className="align-center grid h-full grow place-items-center">
                        <p>No countries found!</p>
                    </div>
                ))) || <p>Loading</p>}
        </main>
    );
}
