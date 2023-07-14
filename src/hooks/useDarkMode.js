import { useEffect, useState } from 'react';

export default function useDarkMode() {
    // Prefer site settings over system settings when it exists
    const [darkMode, setDarkMode] = useState(() => {
        const siteSettings = JSON.parse(localStorage.getItem('countries-darkMode'));
        const systemSettings = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return siteSettings ?? systemSettings;
    });

    function toggleDarkMode() {
        setDarkMode((currentState) => {
            localStorage.setItem('countries-darkMode', JSON.stringify(!currentState));
            return !currentState;
        });
    }

    // Watch for system settings changes
    useEffect(() => {
        function changeDarkMode(event) {
            localStorage.removeItem('countries-darkMode');
            setDarkMode(event.matches);
        }
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        query.addEventListener('change', changeDarkMode);
        return () => query.removeEventListener('change', changeDarkMode);
    }, []);

    // Actually change theme
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode === true) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    return { darkMode, toggleDarkMode };
}
