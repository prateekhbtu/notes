import React from 'react';

const IndividualNotes = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">Individual Notes</h1>
      </header>
      <main>
        <section className="notes-section py-6">
          <div className="note-card bg-white p-4 rounded-md shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-2">Note Title</h2>
            <p className="text-gray-700">This is the content of the note. It can be multiple paragraphs long and include various types of information.</p>
          </div>
          <div className="note-card bg-white p-4 rounded-md shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-2">Another Note Title</h2>
            <p className="text-gray-700">This is another note. It also contains important information and can be styled using Tailwind CSS.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IndividualNotes;
