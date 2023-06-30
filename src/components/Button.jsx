import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

export default function Button({ className, to, children }) {
    return (
        <Link
            className={twMerge('inline-block rounded border border-black px-8 py-1 dark:border-white', className)}
            to={to}
        >
            {children}
        </Link>
    );
}
