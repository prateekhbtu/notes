import React from 'react';

const GroupCard = ({ group }) => {
  return (
    <div className="group-card bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{group.name}</h2>
      <p className="text-gray-700 dark:text-gray-300">{group.description}</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Notes</button>
      </div>
    </div>
  );
};

export default GroupCard;
