import { useState } from 'react';

import Header from './components/Header';
import CountryDetails from './CountryDetails';
import CountriesFilter from './CountriesFilter';

export default function App() {
    const [countryCode, setCountryCode] = useState(null);

    return (
        <div className="flex min-h-screen flex-col bg-gray-100 text-gray-950 dark:bg-dark-bg-back dark:text-white">
            <Header />
            {(countryCode && (
                <CountryDetails key={countryCode} countryCode={countryCode} setCountryCode={setCountryCode} />
            )) || <CountriesFilter setCountryCode={setCountryCode} />}
        </div>
    );
}
