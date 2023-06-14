export default function Info({ name, value }) {
    return (
        (typeof value === 'string' && (
            <p>
                <span className="font-bold">{name}: </span>
                {value}
            </p>
        )) || (
            <>
                <p className="font-bold">{name}: </p> {value}
            </>
        )
    );
}
