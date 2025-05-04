import React from 'react';
import Header from '../components/Header';
import '../styles/Pricing.css';

const Pricing = () => {
  return (
    <div className="pricing-page">
      <Header />
      
      <div className="pricing-content">
        <div className="pricing-header">
          <h1>Choose your <span className="highlight">plan</span></h1>
          <p>Get credits to redesign your spaces with our AI interior designer</p>
        </div>
        
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="card-header">
              <h2>Pro</h2>
              <div className="price">
                <span className="amount">$7</span>
                <span className="period">/ month</span>
              </div>
            </div>
            <div className="card-content">
              <ul className="features">
                <li>30 room redesigns</li>
                <li>All design styles</li>
                <li>High quality results</li>
                <li>Download designs</li>
              </ul>
              <button
                className="buy-button"
                onClick={() => window.open('https://buy.stripe.com/5kA14O9341wW4Fi3cc', '_blank', 'noopener,noreferrer')}
              >
                Pay now
              </button>
            </div>
          </div>
          
          <div className="pricing-card featured">
            
            <div className="card-header">
              <h2>Premium</h2>
              <div className="price">
                <span className="amount">$16</span>
                <span className="period">/ month</span>
              </div>
            </div>
            <div className="card-content">
              <ul className="features">
                <li>100 room redesigns</li>
                <li>All design styles</li>
                <li>Ultra high quality results</li>
                <li>Priority processing</li>
                <li>Download designs</li>
              </ul>
              <button
                className="buy-button"
                onClick={() => window.open('https://buy.stripe.com/fZe00K3IKdfEgo03cd', '_blank', 'noopener,noreferrer')}
              >
                Pay now
              </button>
            </div>
          </div>
          
          <div className="pricing-card">
            <div className="card-header">
              <h2>Business</h2>
              <div className="price">
                <span className="amount">$27</span>
                <span className="period">/ month</span>
              </div>
            </div>
            <div className="card-content">
              <ul className="features">
                <li>200 room redesigns</li>
                <li>All design styles</li>
                <li>Ultra high quality results</li>
                <li>Priority processing</li>
                <li>Download designs</li>
                <li>Bulk processing</li>
              </ul>
              <button
                className="buy-button"
                onClick={() => window.open('https://buy.stripe.com/cN228S7Z07VkfjW002', '_blank', 'noopener,noreferrer')}
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
        
        <div className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How do credits work?</h3>
            <p>Each credit allows you to generate one room redesign. Once you purchase a plan, credits will be added to your account and you can use them anytime.</p>
          </div>
          <div className="faq-item">
            <h3>Do credits expire?</h3>
            <p>No, your credits never expire. You can use them at your own pace.</p>
          </div>
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and Apple Pay.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
