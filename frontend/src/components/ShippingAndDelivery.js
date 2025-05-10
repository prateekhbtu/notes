import React from 'react';

const ShippingAndDelivery = () => {
  return (
    <div className="container">
      <h1 className="header">Shipping and Delivery</h1>
      <div className="card">
        <h2 className="card-title">Shipping Policy</h2>
        <p className="card-content">
          We offer free shipping on all orders over $50. Orders under $50 will
          be charged a flat rate of $5 for shipping. All orders are processed
          within 2-3 business days. Orders are not shipped or delivered on
          weekends or holidays.
        </p>
      </div>
      <div className="card">
        <h2 className="card-title">Delivery Time</h2>
        <p className="card-content">
          Delivery times may vary depending on your location. Estimated delivery
          times are as follows:
        </p>
        <ul className="card-content">
          <li>Local: 1-2 business days</li>
          <li>Domestic: 3-5 business days</li>
          <li>International: 7-14 business days</li>
        </ul>
      </div>
      <div className="card">
        <h2 className="card-title">Order Tracking</h2>
        <p className="card-content">
          Once your order has shipped, you will receive a shipment confirmation
          email containing your tracking number(s). The tracking number will be
          active within 24 hours.
        </p>
      </div>
      <div className="card">
        <h2 className="card-title">Customs, Duties, and Taxes</h2>
        <p className="card-content">
          We are not responsible for any customs and taxes applied to your
          order. All fees imposed during or after shipping are the
          responsibility of the customer (tariffs, taxes, etc.).
        </p>
      </div>
      <div className="card">
        <h2 className="card-title">Damages</h2>
        <p className="card-content">
          If you received your order damaged, please contact us immediately for
          assistance.
        </p>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;
