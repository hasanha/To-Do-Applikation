import React from 'react';
import type { ITodo } from '../types/Todo';
import TodoItem from './TodoItem';
import { AnimatePresence } from 'framer-motion';
import type { ApiParams } from '../types/Api';

interface TodoListProps {
    todos: ITodo[];
    currentFilterParams: ApiParams;
}

const TodoList: React.FC<TodoListProps> = ({ todos, currentFilterParams }) => {
    if (todos.length === 0) {
        return (
            <p className="text-center text-gray-500 mt-10 p-6 bg-white rounded-lg shadow-md">
                Keine Aufgaben gefunden. Fügen Sie oben eine neue Aufgabe hinzu!
            </p>
        );
    }

    return (
        <div className="space-y-3">
            <AnimatePresence>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        // ✅ التعديل هنا: تمرير الـ Prop إلى TodoItem
                        currentFilterParams={currentFilterParams}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TodoList;