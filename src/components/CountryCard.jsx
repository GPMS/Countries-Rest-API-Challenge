import Info from './Info';
import Image from './Image';

export default function CountryCard({ id, country, setCountryIndex }) {
    return (
        <div
            className="flex flex-col overflow-hidden rounded-md bg-white drop-shadow hover:cursor-pointer focus:border focus:border-blue-400 dark:bg-dark-bg-front"
            onClick={() => setCountryIndex(id)}
        >
            <Image className="h-full max-h-[300px]" src={country.flags.png} />
            <div className="p-5">
                <h2 className="mb-5 text-center text-3xl font-bold">{country.name}</h2>
                <Info name="Population" value={country.population.toLocaleString('en-US')} />
                <Info name="Region" value={country.region} />
                <Info name="Capital" value={country.capital} />
            </div>
        </div>
    );
}
