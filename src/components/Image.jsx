import { twMerge } from 'tailwind-merge';

export default function Image({ src, className }) {
    return <img src={src} alt="" className={twMerge('w-full', className)} />;
}
