import React, { useState } from 'react';
import type { FilterStatus, ApiParams } from '../types/Api';
import { motion } from 'framer-motion';

interface FilterSortBarProps {
    onFilterSortSearch: (params: ApiParams) => void;
}

const statusOptions: { value: FilterStatus, label: string }[] = [
    { value: '', label: 'Alle Status' },
    { value: 'OPEN', label: 'Offen' },
    { value: 'IN_PROGRESS', label: 'In Bearbeitung' },
    { value: 'DONE', label: 'Erledigt' },
];

const FilterSortBar: React.FC<FilterSortBarProps> = ({ onFilterSortSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<FilterStatus>('');
    const [ordering, setOrdering] = useState('-created_at');

    const handleFilterChange = (
        newSearchQuery: string = searchQuery,
        newStatusFilter: FilterStatus = statusFilter,
        newOrdering: string = ordering
    ) => {
        const params: ApiParams = {};

        if (newSearchQuery) {
            params.search = newSearchQuery;
        }
        if (newStatusFilter) {
            params.status = newStatusFilter;
        }
        if (newOrdering) {
            params.ordering = newOrdering;
        }

        onFilterSortSearch(params);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        handleFilterChange(value, statusFilter, ordering);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as FilterStatus;
        setStatusFilter(value);
        handleFilterChange(searchQuery, value, ordering);
    };

    const handleOrderingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setOrdering(value);
        handleFilterChange(searchQuery, statusFilter, value);
    };

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row gap-4 items-center"
        >

            <input
                type="text"
                placeholder="Nach Titel oder Beschreibung suchen..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
            />

            <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
            >
                {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>

            <select
                value={ordering}
                onChange={handleOrderingChange}
                className="p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
            >
                <option value="-created_at">Datum (Neueste zuerst)</option>
                <option value="created_at">Datum (Älteste zuerst)</option>
                <option value="status">Status</option>
                <option value="title">Titel (A-Z)</option>
            </select>
        </motion.div>
    );
};

export default FilterSortBar;