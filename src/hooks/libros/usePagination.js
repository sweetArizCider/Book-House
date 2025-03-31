import { useState } from "react";

export function usePagination(items, itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const since = (currentPage - 1) * itemsPerPage;
    const to = Math.min(items.length, currentPage * itemsPerPage);

    const paginatedItems = items.slice(since, to);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return {
        currentPage,
        paginatedItems,
        handlePageChange,
    };
}