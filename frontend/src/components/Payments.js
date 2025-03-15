import React from 'react';

const Payments = () => {
  return (
    <div className="container">
      <h1 className="header">Payments</h1>
      <div className="card">
        <h2 className="card-title">Payment Methods</h2>
        <p className="card-content">We accept the following payment methods:</p>
        <ul className="list-disc list-inside">
          <li>Credit Card</li>
          <li>Debit Card</li>
          <li>PayPal</li>
          <li>Bank Transfer</li>
        </ul>
      </div>
      <div className="card">
        <h2 className="card-title">Payment Security</h2>
        <p className="card-content">
          We ensure that your payment information is protected with the highest level of security.
        </p>
      </div>
      <div className="card">
        <h2 className="card-title">Refund Policy</h2>
        <p className="card-content">
          If you are not satisfied with your purchase, you can request a refund within 30 days of the purchase date.
        </p>
      </div>
    </div>
  );
};

export default Payments;
