import CountryDetails from './pages/CountryDetails';
import CountriesFilter from './pages/CountriesFilter';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

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
