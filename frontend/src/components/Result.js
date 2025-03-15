import React from 'react';

const Result = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">Quiz Result</h1>
      </header>
      <main>
        <section className="result-section flex flex-col items-center justify-center bg-gray-100 rounded-md p-6">
          <div className="result-container w-full max-w-md">
            <div className="result-details mb-4">
              <h2 className="text-2xl font-bold">Your Results</h2>
              <p className="text-lg">Correct: <span className="text-green-500">8</span></p>
              <p className="text-lg">Wrong: <span className="text-red-500">2</span></p>
              <p className="text-lg">Total Questions: 10</p>
              <p className="text-lg">You got: <span className="text-yellow-500">80%</span></p>
            </div>
            <div className="actions-container mt-6">
              <button className="retry-button w-full py-2 px-4 bg-blue-500 text-white rounded-md">Retry</button>
              <button className="home-button w-full py-2 px-4 bg-green-500 text-white rounded-md mt-2">Go to Home</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Result;
