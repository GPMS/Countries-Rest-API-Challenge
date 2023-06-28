import Info from './Info';
import Image from './Image';

export default function CountryCard({ id, country, setCountryIndex }) {
    return (
        <div
            className="grid grid-rows-2 overflow-hidden rounded-md bg-white drop-shadow hover:cursor-pointer focus:border focus:border-blue-400 dark:bg-dark-bg-front"
            onClick={() => setCountryIndex(country.cca3)}
        >
            <Image className="h-full max-h-[300px]" src={country.flags.png} />
            <div className="p-5">
                <h2 className="mb-5 text-xl font-bold">{country.name.official}</h2>
                <Info name="Population" value={country.population.toLocaleString('en-US')} />
                <Info name="Region" value={country.region} />
                {country.capital && <Info name="Capital" value={country.capital[0]} />}
            </div>
        </div>
    );
}
