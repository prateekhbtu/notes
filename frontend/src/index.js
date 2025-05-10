import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import ReturnAndRefund from './components/ReturnAndRefund';
import ShippingAndDelivery from './components/ShippingAndDelivery';
import TermsAndConditions from './components/TermsAndConditions';
import ViewNotes from './components/ViewNotes';
import GroupCard from './components/GroupCard';
import IndividualNotes from './components/IndividualNotes';
import AboutUs from './components/AboutUs';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Payments from './components/Payments';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Notes App</h1>
      </header>
      <main>
        <ContactUs />
        <PrivacyPolicy />
        <ReturnAndRefund />
        <ShippingAndDelivery />
        <TermsAndConditions />
        <ViewNotes />
        <GroupCard />
        <IndividualNotes />
        <AboutUs />
        <Quiz />
        <Result />
        <Payments />
        <ChatBot />
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
