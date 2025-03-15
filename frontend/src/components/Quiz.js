import React, { useState } from 'react';

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      alert(`You selected: ${selectedOption}`);
    } else {
      alert('Please select an option.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">Quiz</h1>
      </header>
      <main>
        <section className="quiz-section flex flex-col items-center justify-center bg-gray-100 rounded-md p-6">
          <div className="quiz-container w-full max-w-md">
            <div className="question-container mb-4">
              <h2 className="text-2xl font-bold">Question 1</h2>
              <p className="text-lg">What is the capital of France?</p>
            </div>
            <div className="options-container space-y-2">
              <button
                className={`option-button w-full py-2 px-4 rounded-md ${selectedOption === 'Paris' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
                onClick={() => handleOptionClick('Paris')}
              >
                Paris
              </button>
              <button
                className={`option-button w-full py-2 px-4 rounded-md ${selectedOption === 'London' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
                onClick={() => handleOptionClick('London')}
              >
                London
              </button>
              <button
                className={`option-button w-full py-2 px-4 rounded-md ${selectedOption === 'Berlin' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
                onClick={() => handleOptionClick('Berlin')}
              >
                Berlin
              </button>
              <button
                className={`option-button w-full py-2 px-4 rounded-md ${selectedOption === 'Madrid' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
                onClick={() => handleOptionClick('Madrid')}
              >
                Madrid
              </button>
            </div>
            <div className="submit-container mt-6">
              <button
                className="submit-button w-full py-2 px-4 bg-green-500 text-white rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Quiz;
