import { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

import CountryDetails from './pages/CountryDetails';
import CountriesFilter from './pages/CountriesFilter';

function Layout() {
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
        <div className="flex min-h-screen flex-col bg-gray-100 text-gray-950 dark:bg-dark-bg-back dark:text-white">
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
            <Outlet />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<CountriesFilter />} />
                <Route path=":countryCode" element={<CountryDetails />} />
            </Route>
        </Routes>
    );
}
