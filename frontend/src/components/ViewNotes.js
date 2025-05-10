import React from 'react';

const ViewNotes = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="header text-3xl font-bold mb-4">View Notes</header>
      <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="card-title text-xl font-semibold mb-2">Note Title</h2>
        <p className="card-content text-gray-700">Note content goes here...</p>
      </div>
      <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="card-title text-xl font-semibold mb-2">Note Title</h2>
        <p className="card-content text-gray-700">Note content goes here...</p>
      </div>
      <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="card-title text-xl font-semibold mb-2">Note Title</h2>
        <p className="card-content text-gray-700">Note content goes here...</p>
      </div>
      <footer className="footer text-center py-4">© 2023 Notes App</footer>
    </div>
  );
};

export default ViewNotes;
