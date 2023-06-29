import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { useState, useEffect } from 'react';

export default function Header() {
    const [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

    function handleToggle() {
        setDarkMode((oldState) => !oldState);
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <header className="flex items-center justify-between border-b-2 bg-white px-4 py-5 drop-shadow dark:border-black dark:bg-dark-bg-front">
            <h1 className="text-2xl font-extrabold">Where in the world?</h1>
            <button className="flex items-center gap-2" onClick={handleToggle}>
                {(darkMode && (
                    <>
                        <MdDarkMode tile="" />
                        Dark mode
                    </>
                )) || (
                    <>
                        <MdOutlineDarkMode title="" />
                        Light mode
                    </>
                )}
            </button>
        </header>
    );
}
