import React from 'react';
import Footer from '../components/Footer/Footer';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. About Dream Trading Club',
      content: 'Dream Trading Club is an educational platform offering tools, resources, and structured content to help learners understand technical analysis, chart reading, and market behavior. We do not provide any investment or trading advice. We are not registered with SEBI or any financial regulatory authority. All our offerings are meant solely for educational purposes.'
    },
    {
      title: '2. Products & Services Offered',
      content: (
        <ul>
          <li>DTC Indicator Tool – Custom tool on TradingView (lifetime access post-purchase)</li>
          <li>Recorded Video Course – Guide to using the DTC Indicator</li>
          <li>Educational PDFs – Technical content and usage instructions</li>
          <li>WhatsApp Support – Tool setup, general guidance, content clarification</li>
        </ul>
      )
    },
    {
      title: '3. Payment & Delivery',
      content: 'All purchases must be made through our official website (www.dtcclub.in) or authorized team members. Upon confirmation of payment, access to the DTC Indicator, course content, and WhatsApp support is granted typically within 1–12 hours.'
    },
    {
      title: '4. Legal Nature of Services',
      content: 'Dream Trading Club operates strictly for educational purposes. We are not financial advisors, portfolio managers, or SEBI-registered entities. We provide no buy/sell recommendations or guaranteed returns.'
    },
    {
      title: '5. Refund Policy',
      content: (
        <div>
          <p><strong>No Refunds Will Be Issued If:</strong></p>
          <ul>
            <li>Access to any tool or course content has been delivered</li>
            <li>Tool is not liked or didn’t work as expected</li>
            <li>Purchase made by mistake or regret after buying</li>
          </ul>
          <p><strong>Refunds May Be Issued ONLY If:</strong></p>
          <ul>
            <li>No access/content was delivered within 72 hours</li>
            <li>No access was granted and support was absent</li>
          </ul>
          <p>Refunds must be requested within 24 hours of purchase with receipt, transaction ID, and issue explanation.</p>
        </div>
      )
    },
    {
      title: '6. Client Responsibility',
      content: (
        <ul>
          <li>Read full product descriptions before buying</li>
          <li>Do not share tool/PDFs/videos with others</li>
          <li>Use products for personal educational use only</li>
          <li>Do not demand refunds based on opinion or market results</li>
        </ul>
      )
    },
    {
      title: '7. Violation of Terms',
      content: (
        <ul>
          <li>Sharing or reselling our content/tools</li>
          <li>Making false refund claims</li>
          <li>Abusive behavior with our team</li>
          <li>Copyright infringement will result in legal action</li>
        </ul>
      )
    },
    {
      title: '8. Policy Acceptance',
      content: 'By purchasing from Dream Trading Club, you agree to our Terms & Conditions, Refund Policy, and Educational Disclaimer. Use of our tools is entirely at your own risk.'
    },
    {
      title: '9. Contact & Support',
      content: (
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px', borderRadius: '8px' }}>
          <p><strong>WhatsApp:</strong> +91 78599 91926</p>
          <p><strong>Website:</strong> www.dtcclub.in</p>
          <p><strong>Email:</strong> dtcclub1@gmail.com</p>
        </div>
      )
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#ffffff' // full white background
    }}>
      {/* Space for fixed navbar */}
      <div style={{ height: '100px' }} />

      <main style={{
        flex: 1,
        padding: '40px 60px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '10px',
          borderBottom: '2px solid #3498db',
          paddingBottom: '10px'
        }}>
          Terms & Conditions & Refund Policy
        </h1>
        <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Issued by: Dream Trading Club</p>

        {sections.map((section, index) => (
          <section key={index} style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#2c3e50',
              fontSize: '1.5rem',
              marginBottom: '15px'
            }}>{section.title}</h2>
            <div style={{
              color: '#34495e',
              lineHeight: '1.6'
            }}>{section.content}</div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
