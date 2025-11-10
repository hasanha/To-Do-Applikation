import React from 'react';
import type { ITodo, TodoStatus } from '../types/Todo';
import { motion } from 'framer-motion';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../services/todosApi';
import toast from 'react-hot-toast';
import type { ApiParams } from '../types/Api';

interface TodoItemProps {
    todo: ITodo;
    currentFilterParams: ApiParams;
}

const statusMap: Record<TodoStatus, { label: string, classes: string }> = {
    OPEN: { label: 'Offen', classes: 'bg-red-100 text-red-700' },
    IN_PROGRESS: { label: 'In Bearbeitung', classes: 'bg-yellow-100 text-yellow-700' },
    DONE: { label: 'Erledigt', classes: 'bg-green-100 text-green-700' },
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, currentFilterParams }) => {
    const currentStatus = statusMap[todo.status];
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

    const handleUpdateStatus = async (newStatus: TodoStatus) => {
        try {
            await updateTodo({
                id: todo.id,
                status: newStatus,
                queryArgs: currentFilterParams,
            }).unwrap();

            toast.success(`Aufgabe erfolgreich auf '${statusMap[newStatus].label}' aktualisiert!`);
        } catch (err) {
            toast.error('Fehler beim Aktualisieren der Aufgabe.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id).unwrap();

            toast.success(`Aufgabe "${todo.title}" erfolgreich gelöscht!`);
        } catch (err) {
            toast.error('Fehler beim Löschen der Aufgabe.');
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white shadow-md rounded-lg mb-3 border-l-4 border-blue-500 hover:shadow-xl hover:scale-[1.01] transition duration-300 ease-in-out"
        >

            <div className="flex-1 min-w-0">
                <h3 className={`text-xl font-semibold mb-1 ${todo.status === 'DONE' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {todo.title}
                </h3>
                {todo.description && (
                    <p className="text-gray-600 text-sm mb-2 sm:mb-0">
                        {todo.description}
                    </p>
                )}
            </div>

            <div className="flex shrink-0 items-center space-x-3 mt-3 sm:mt-0">

                <span className={`px-3 py-1 text-xs font-medium rounded-full ${currentStatus.classes} whitespace-nowrap`}>
                    {currentStatus.label}
                </span>

                {todo.status === 'OPEN' && (
                    <button
                        onClick={() => handleUpdateStatus('IN_PROGRESS')}
                        className="px-3 py-1 text-sm font-medium rounded-lg text-yellow-800 bg-yellow-200 hover:bg-yellow-300 transition duration-150 whitespace-nowrap"
                        title="Als In Bearbeitung markieren"
                    >
                        ⏳
                    </button>
                )}

                {(todo.status === 'OPEN' || todo.status === 'IN_PROGRESS') && (
                    <button
                        onClick={() => handleUpdateStatus('DONE')}
                        className="px-3 py-1 text-sm font-medium rounded-lg text-green-800 bg-green-200 hover:bg-green-300 transition duration-150 whitespace-nowrap"
                        title="Als Erledigt markieren"
                    >
                        ✅
                    </button>
                )}

                {todo.status !== 'OPEN' && (
                    <button
                        onClick={() => handleUpdateStatus('OPEN')}
                        className="px-3 py-1 text-sm font-medium rounded-lg text-blue-800 bg-blue-200 hover:bg-blue-300 transition duration-150 whitespace-nowrap"
                        title="Als Offen markieren"
                    >
                        ↩️
                    </button>
                )}

                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-sm font-medium rounded-lg text-red-800 bg-red-200 hover:bg-red-300 transition duration-150 whitespace-nowrap disabled:bg-red-100"
                    title="Aufgabe löschen"
                    disabled={isDeleting}
                >
                    {isDeleting ? '...' : '🗑️'}
                </button>
            </div>
        </motion.div>
    );
};

export default TodoItem;