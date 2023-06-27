import { useState, useEffect } from 'react';

import Header from './components/Header';
import CountryDetails from './CountryDetails';
import CountriesFilter from './CountriesFilter';

export default function App() {
    let [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

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

    const [countryCode, setCountryCode] = useState(null);

    return (
        <div className="flex min-h-screen flex-col bg-gray-100 text-gray-950 dark:bg-dark-bg-back dark:text-white">
            <Header darkMode={darkMode} handleToggle={handleToggle} />
            {(countryCode && (
                <CountryDetails key={countryCode} countryCode={countryCode} setCountryCode={setCountryCode} />
            )) || <CountriesFilter setCountryCode={setCountryCode} />}
        </div>
    );
}
