import { useState, useRef, useCallback } from 'react';

export default function usePagination(entriesPerPage, totalItems) {
    const [currentPage, setCurrentPage] = useState(1);
    const observer = useRef(null);

    const lastItem = useCallback(
        (node) => {
            if (!node) return;
            if (observer.current) {
                observer.current.disconnect();
            }
            if (node) {
                observer.current = new IntersectionObserver((entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            setCurrentPage((oldPage) => {
                                if (oldPage * entriesPerPage >= totalItems) {
                                    return oldPage;
                                }
                                return oldPage + 1;
                            });
                            return;
                        }
                    }
                });
                observer.current.observe(node);
            }
        },
        [entriesPerPage, totalItems],
    );

    function resetPage() {
        setCurrentPage(1);
    }

    return { lastItem, currentPage, resetPage };
}
