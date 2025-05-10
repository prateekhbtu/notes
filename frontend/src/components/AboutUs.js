import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight">About Us</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96">
              <p className="text-lg">
                Welcome to our platform. We are dedicated to providing the best service possible.
              </p>
              <p className="mt-4">
                Our team is composed of experienced professionals who are passionate about their work.
              </p>
              <p className="mt-4">
                We believe in continuous improvement and always strive to exceed our customers' expectations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
