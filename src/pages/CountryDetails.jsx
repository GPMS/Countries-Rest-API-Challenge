import Info from '../components/Info';
import Button from '../components/Button';
import Image from '../components/Image';

import { useParams } from 'react-router-dom';
import useCountries from '../hooks/useCountries';

export default function CountryDetails() {
    const { countryCode } = useParams();

    const { data, isLoading, error } = useCountries({ code: countryCode });
    let country = null;
    let borderCountries = null;
    if (!isLoading && !error) {
        country = data.country;
        borderCountries = data.borderCountries;
    }

    return (
        <main className="container mx-auto px-[5%] pb-[10%]">
            <Button className="my-10" to="/">
                &larr; Go back
            </Button>
            <div className="gap-30 mx-auto flex flex-col gap-10 lg:flex-row">
                {isLoading && <p>Loading</p>}
                {!isLoading && error && (
                    <>
                        <h2>Error: could not load country</h2>
                        <p>{error}</p>
                    </>
                )}
                {!isLoading && !error && (
                    <>
                        <Image className="mx-auto max-h-[400px] max-w-[500px] lg:mx-0" src={country.flags.png} />
                        <div className="flex flex-col gap-10">
                            <h2 className="text-3xl font-bold">{country.name.official}</h2>
                            <div className="flex flex-col gap-8 md:flex-row">
                                <div>
                                    {country.name.nativeName && (
                                        <Info
                                            name="Native Name"
                                            value={
                                                country.name.nativeName[Object.keys(country.name.nativeName)[0]]
                                                    .official
                                            }
                                        />
                                    )}
                                    <Info name="Population" value={country.population.toLocaleString('en-US')} />
                                    <Info name="Region" value={country.region} />
                                    {country.subregion && <Info name="Sub Region" value={country.subregion} />}
                                    {country.capital && <Info name="Capital" value={country.capital.join(', ')} />}
                                </div>
                                <div>
                                    <Info name="Top Level Domain" value={country.tld.join(', ')} />
                                    {country.currencies && (
                                        <Info
                                            name="Currencies"
                                            value={Object.keys(country.currencies)
                                                .map((key) => country.currencies[key].name)
                                                .join(', ')}
                                        />
                                    )}
                                    {country.languages && (
                                        <Info
                                            name="Languages"
                                            value={Object.keys(country.languages)
                                                .map((key) => country.languages[key])
                                                .join(', ')}
                                        />
                                    )}
                                </div>
                            </div>
                            {borderCountries && (
                                <div className="flex flex-col gap-2 lg:flex-row">
                                    <Info
                                        name="Border Countries"
                                        value={
                                            <div className="flex flex-wrap gap-2">
                                                {borderCountries.map((borderCountry, idx) => {
                                                    return (
                                                        <Button key={idx} to={`/${borderCountry.cca3}`}>
                                                            {borderCountry.name.official}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        }
                                    ></Info>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
