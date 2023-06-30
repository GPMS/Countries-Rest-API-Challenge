import { useState } from 'react';

import CountryDetails from './CountryDetails';
import CountriesFilter from './CountriesFilter';
import Layout from './Layout';
import { Routes, Route, redirect } from 'react-router-dom';

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
