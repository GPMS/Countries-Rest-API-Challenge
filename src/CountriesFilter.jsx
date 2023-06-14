import { useId, useState } from 'react';
import { MdSearch } from 'react-icons/md';

import CountryCard from './components/CountryCard';

export default function CountriesFilter({ data, setCountryIndex }) {
    const [filter, setFilter] = useState({
        text: '',
        region: 'default',
    });

    function handleInput(e) {
        let { name, value } = e.target;
        setFilter((oldFilter) => ({
            ...oldFilter,
            [name]: value,
        }));
    }

    function canShow(country) {
        if (filter.region !== 'default' && country.region !== filter.region) {
            return false;
        }
        if (filter.text) {
            let names = country.altSpellings ? [country.name, ...country.altSpellings] : [country.name];
            if (!names.some((name) => name.toLowerCase().includes(filter.text.toLowerCase()))) {
                return false;
            }
        }
        return true;
    }

    let shownCountriesCount = data.reduce((prevValue, country) => {
        return canShow(country) ? prevValue + 1 : prevValue;
    }, 0);

    const searchId = useId();

    return (
        <main className="container mx-auto flex h-auto grow flex-col p-7">
            <div className="mb-10 items-center lg:flex lg:justify-between">
                <div className="relative">
                    <input
                        id={searchId}
                        onInput={handleInput}
                        className="focus-visible:outline:none mb-5 rounded p-[.5rem] pl-[2rem] text-sm drop-shadow focus-visible:border-violet-800 dark:bg-dark-bg-front dark:text-white lg:mb-0"
                        type="text"
                        name="text"
                        placeholder="Search for a country..."
                    />
                    <label htmlFor={searchId} className="absolute left-[.5rem] translate-y-[60%] scale-125">
                        <MdSearch title="Search" />
                    </label>
                </div>
                <select
                    className="block rounded bg-white p-2 dark:border-black dark:bg-dark-bg-front"
                    onChange={handleInput}
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
            {shownCountriesCount > 0 ? (
                <div className="grid grid-cols-1 gap-10 px-10 lg:grid-cols-4 lg:gap-5">
                    {data.map((country, index) => {
                        if (canShow(country))
                            return (
                                <CountryCard
                                    key={index}
                                    id={index}
                                    country={country}
                                    setCountryIndex={setCountryIndex}
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
            )}
        </main>
    );
}
