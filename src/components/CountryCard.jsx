import Info from './Info';
import Image from './Image';

export default function CountryCard({ id, name, flag, info }) {
    return (
        <div className="grid h-full grid-rows-2 overflow-hidden rounded-md bg-white drop-shadow hover:cursor-pointer focus:border focus:border-blue-400 dark:bg-dark-bg-front">
            <Image className="h-full max-h-[300px]" src={flag} />
            <div className="p-5">
                <h2 className="mb-5 text-xl font-bold">{name}</h2>
                {info.map((el, idx) => (
                    <Info key={idx} name={el.title} value={el.value} />
                ))}
            </div>
        </div>
    );
}
