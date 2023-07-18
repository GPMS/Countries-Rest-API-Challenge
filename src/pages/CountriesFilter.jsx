import { useId, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

import Image from '../components/Image';
import Info from '../components/Info';

import useCountries from '../hooks/useCountries';
import usePagination from '../hooks/usePagination';

function CountryCard({ id, name, flag, info }) {
    return (
        <article className="grid h-full grid-rows-2 overflow-hidden rounded-md bg-white drop-shadow hover:cursor-pointer focus:border focus:border-blue-400 dark:bg-dark-bg-front">
            <Image className="h-full max-h-[300px]" src={flag} />
            <div className="p-5">
                <h2 className="mb-5 text-xl font-bold">{name}</h2>
                {info.map((el, idx) => (
                    <Info key={idx} name={el.title} value={el.value} />
                ))}
            </div>
        </article>
    );
}

export default function CountriesFilter() {
    let [searchParams, setSearchParams] = useSearchParams();

    const filterText = searchParams.get('q') || '';
    const filterRegion = searchParams.get('region') || 'default';

    const { data: countries, isLoading, error } = useCountries({ region: filterRegion });

    const ENTRIES_PER_ROW = 4;
    const ENTRIES_PER_PAGE = 3 * ENTRIES_PER_ROW;
    const { lastItem, currentPage, resetPage } = usePagination(ENTRIES_PER_PAGE, countries?.length);
    let renderedEntriesCount = 0;
    const isPageComplete = (renderedCount) => renderedCount === currentPage * ENTRIES_PER_PAGE;

    function handleInput(e) {
        resetPage();
        const { name, value } = e.target;
        if (name === 'q' && value.length === 0) {
            setSearchParams((searchParams) => {
                searchParams.delete(name);
                return searchParams;
            });
        } else if (name === 'region' && value === 'default') {
            setSearchParams((searchParams) => {
                searchParams.delete(name);
                return searchParams;
            });
        } else {
            setSearchParams((searchParams) => {
                searchParams.set(name, value);
                return searchParams;
            });
        }
    }

    function canShow(country) {
        if (filterText) {
            let names = country.altSpellings
                ? [country.name.official, ...country.altSpellings]
                : [country.name.official];
            if (!names.some((name) => name.toLowerCase().includes(filterText.toLowerCase()))) {
                return false;
            }
        }
        return true;
    }

    let shownCountriesCount = 0;
    if (!isLoading && !error && countries) {
        shownCountriesCount = countries.reduce((prevValue, country) => {
            return canShow(country) ? prevValue + 1 : prevValue;
        }, 0);
    }

    const searchId = useId();
    const selectId = useId();

    return (
        <main className="container mx-auto flex h-auto grow flex-col px-4 pt-7 lg:px-0">
            <section title="filters" className="mb-10 flex flex-col gap-5 lg:flex-row lg:justify-between">
                <div className="relative">
                    <input
                        id={searchId}
                        onInput={handleInput}
                        className="w-full rounded p-4 pl-[2rem] text-sm drop-shadow focus-visible:border-violet-800 dark:bg-dark-bg-front dark:text-white lg:w-[500px]"
                        type="search"
                        name="q"
                        placeholder="Search for a country..."
                        value={filterText}
                    />
                    <label htmlFor={searchId} className="absolute left-[.5rem] translate-y-[100%] scale-125">
                        <MdSearch title="Search icon" />
                    </label>
                </div>
                <select
                    id={selectId}
                    className="block rounded bg-white p-2 dark:border-black dark:bg-dark-bg-front"
                    onChange={handleInput}
                    name="region"
                    value={filterRegion}
                >
                    <option aria-label="default" value="default">
                        --Filter by Region--
                    </option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <label className="sr-only" htmlFor={selectId}>
                    Region filter
                </label>
            </section>
            {isLoading && (
                <section>
                    <p>Loading</p>
                </section>
            )}
            {error && (
                <section>
                    <h2>Error loading countries</h2>
                    <p>{error}</p>
                </section>
            )}
            {!isLoading && !error && shownCountriesCount > 0 && (
                <section title="countries" className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {countries.map((country) => {
                        if (canShow(country)) {
                            if (isPageComplete(renderedEntriesCount)) {
                                return null;
                            }
                            renderedEntriesCount++;
                            let countryInfo = {
                                name: country.name.official,
                                flag: country.flags.png,
                                info: [
                                    { title: 'Population', value: country.population.toLocaleString('en-US') },
                                    { title: 'Region', value: country.region },
                                ],
                            };
                            if (country.capital) {
                                countryInfo.info.push({
                                    title: 'Capital',
                                    value: country.capital.join(','),
                                });
                            }
                            return (
                                <Link
                                    ref={isPageComplete(renderedEntriesCount) ? lastItem : null}
                                    key={country.cca3}
                                    aria-label={countryInfo.name}
                                    to={`/${country.cca3.toLowerCase()}`}
                                >
                                    <CountryCard {...countryInfo} />
                                </Link>
                            );
                        } else {
                            return null;
                        }
                    })}
                </section>
            )}
            {!isLoading && !error && shownCountriesCount == 0 && (
                <section title="countries" className="align-center grid h-full grow place-items-center">
                    <p>No countries found!</p>
                </section>
            )}
        </main>
    );
}
