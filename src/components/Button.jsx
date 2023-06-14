import { twMerge } from 'tailwind-merge';

export default function Button({ className, onClick, children }) {
    return (
        <button
            className={twMerge('rounded border border-black px-8 py-1 dark:border-white', className)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
