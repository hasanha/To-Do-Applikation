import React, { useState } from 'react';
import { useGetTodosQuery } from '../services/todosApi';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import FilterSortBar from '../components/FilterSortBar';
import LoadingSpinner from '../components/LoadingSpinner';
import type { ApiParams } from '../types/Api';


const TodoListPage: React.FC = () => {
    const [filterParams, setFilterParams] = useState<ApiParams>({});

    const {
        data: todos,
        isLoading,
        isFetching,
        isError,
    } = useGetTodosQuery(filterParams);

    const handleFilterSortSearch = (params: ApiParams) => {
        setFilterParams(params);
    };


    const showLoading = isLoading || isFetching;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-8 pb-2 text-center 
                bg-clip-text bg-linear-to-r from-orange-600 to-orange-400 
               drop-shadow-lg transform hover:scale-105 transition duration-300">
                Aufgabenliste
            </h1>

            <TodoForm />
            <FilterSortBar onFilterSortSearch={handleFilterSortSearch} />

            {showLoading && <LoadingSpinner />}
            {isError && <p className="text-red-600 text-center font-medium mt-4 p-3 bg-red-100 rounded">Fehler beim Laden der Aufgaben.</p>}

            {!showLoading && !isError && todos && (
                <TodoList
                    todos={todos}
                    currentFilterParams={filterParams}
                />
            )}
        </div>
    );
};

export default TodoListPage;