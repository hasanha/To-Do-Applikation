import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center p-10">
            <div className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 h-12 w-12 mb-4" />
            <p className="ml-3 text-gray-600">Lade Aufgaben...</p>
        </div>
    );
};

export default LoadingSpinner;