import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

import CountryDetails from './pages/CountryDetails';
import CountriesFilter from './pages/CountriesFilter';
import useDarkMode from './hooks/useDarkMode';

export default function App() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <BrowserRouter>
            <div className="flex min-h-screen flex-col bg-gray-100 text-gray-950 dark:bg-dark-bg-back dark:text-white">
                <header className="items-center border-b-2 bg-white px-4 py-5 drop-shadow dark:border-black dark:bg-dark-bg-front">
                    <div className="container mx-auto flex justify-between">
                        <h1 className="text-2xl font-extrabold">Where in the world?</h1>
                        <button className="flex items-center gap-2" onClick={toggleDarkMode}>
                            {(darkMode && (
                                <>
                                    <MdOutlineDarkMode aria-label="light mode" />
                                    Light mode
                                </>
                            )) || (
                                <>
                                    <MdDarkMode aria-label="dark mode" />
                                    Dark mode
                                </>
                            )}
                        </button>
                    </div>
                </header>
                <Routes>
                    <Route path="/">
                        <Route index element={<CountriesFilter />} />
                        <Route path=":countryCode" element={<CountryDetails />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
