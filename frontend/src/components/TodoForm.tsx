import React, { useState } from 'react';
import { useCreateTodoMutation } from '../services/todosApi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const TodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [createTodo, { isLoading }] = useCreateTodoMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Der Titel ist erforderlich!');
            return;
        }
        setError(null);

        try {
            await createTodo({
                title: title.trim(),
                description: description.trim(),
                status: 'OPEN',
            }).unwrap();

            toast.success('Aufgabe erfolgreich hinzugefügt!');
            setTitle('');
            setDescription('');
        } catch (err) {
            toast.error('Fehler beim Hinzufügen der Aufgabe.');
            setError('Fehler beim Hinzufügen der Aufgabe.');
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-xl mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Neue Aufgabe hinzufügen</h2>

            {error && <p className="text-red-500 mb-3 text-sm font-medium">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <input
                    type="text"
                    placeholder="Titel (erforderlich)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 md:col-span-1"
                />

                <input
                    type="text"
                    placeholder="Beschreibung (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 md:col-span-1"
                />

                <button
                    type="submit"
                    className="p-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-150 shadow-md flex items-center justify-center disabled:bg-orange-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Wird hinzugefügt...' : 'Aufgabe Hinzufügen'}
                </button>
            </div>
        </motion.form>
    );
};

export default TodoForm;