import Info from './components/Info';
import Button from './components/Button';
import Image from './components/Image';

export default function CountryDetails({ country, data, setCountryIndex }) {
    const {
        flags,
        name,
        nativeName,
        population,
        region,
        subregion,
        capital,
        topLevelDomain,
        currencies,
        languages,
        borders,
    } = country;
    return (
        <main className="container mx-auto px-[5%] pb-[10%]">
            <Button
                className="my-10"
                onClick={() => {
                    setCountryIndex(-1);
                }}
            >
                &larr; Go back
            </Button>
            <div className="gap-30 mx-auto flex flex-col gap-10 lg:flex-row">
                <Image className="mx-auto max-h-[400px] max-w-[500px] lg:mx-0" src={flags.png} />
                <div className="flex flex-col gap-10">
                    <h2 className="text-3xl font-bold">{name}</h2>
                    <div className="flex flex-col gap-8 md:flex-row">
                        <div>
                            <Info name="Native Name" value={nativeName} />
                            <Info name="Population" value={population.toLocaleString('en-US')} />
                            <Info name="Region" value={region} />
                            <Info name="Sub Region" value={subregion} />
                            {capital && <Info name="Capital" value={capital} />}
                        </div>
                        <div>
                            <Info name="Top Level Domain" value={topLevelDomain.join(',')} />
                            <Info name="Currencies" value={currencies.map((el) => el.name).join(', ')} />
                            <Info name="Languages" value={languages.map((el) => el.name).join(', ')} />
                        </div>
                    </div>
                    {borders && (
                        <div className="flex flex-col gap-2 lg:flex-row">
                            <Info
                                name="Border Countries"
                                value={
                                    <div className="flex flex-wrap gap-2">
                                        {borders.map((name, idx) => {
                                            const index = data.findIndex((country) => country.alpha3Code === name);
                                            return (
                                                <Button key={idx} onClick={() => setCountryIndex(index)}>
                                                    {data[index].name}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                }
                            ></Info>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
