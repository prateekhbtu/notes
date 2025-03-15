import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
      </header>
      <main>
        <section className="privacy-policy-section bg-gray-100 rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">Welcome to Notes Buddy. We value your privacy and are committed to protecting your personal information.</p>
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p className="mb-4">We collect information to provide better services to our users. This includes:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Personal information such as name, email address, etc.</li>
            <li>Usage data such as pages visited, time spent on the site, etc.</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">How We Use Information</h2>
          <p className="mb-4">We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@notesbuddy.com.</p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
