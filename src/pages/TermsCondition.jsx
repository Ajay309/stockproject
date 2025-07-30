import React from 'react';
import Footer from '../components/Footer/Footer';

const TermsCondition = () => {
  const sections = [
    {
      title: '1. About Dream Trading Club',
      content:
        'Dream Trading Club is an educational platform offering tools, resources, and structured content to help learners understand technical analysis, chart reading, and market behavior. We do not provide any investment or trading advice. We are not registered with SEBI or any financial regulatory authority. All our offerings are meant solely for educational purposes.'
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
      content:
        'All purchases must be made through our official website (www.dtctradingclub.com) or authorized team members. Upon confirmation of payment, access to the DTC Indicator, course content, and WhatsApp support is granted typically within 1–12 hours.'
    },
    {
      title: '4. Legal Nature of Services',
      content:
        'Dream Trading Club operates strictly for educational purposes. We are not financial advisors, portfolio managers, or SEBI-registered entities. We provide no buy/sell recommendations or guaranteed returns.'
    },
    {
      title: '5. Refund Policy',
      content: (
        <div style={{ lineHeight: '1.7' }}>
          <p>At Dream Trading Club, we strive to deliver high-quality digital tools, educational content, and customer support. However, due to the nature of digital products, our refund policy is strict and applies only under specific conditions.</p>
          <hr />

          <h4>🔒 No Refund Will Be Issued Under the Following Conditions:</h4>
          <ul>
            <li>✅ <strong>Access Granted:</strong> If access to the DTC Indicator, recorded courses, PDFs, or any part of the purchased digital package has been delivered (via email, WhatsApp, or TradingView invite), no refund will be entertained.</li>
            <li>❌ <strong>Dislike or Dissatisfaction:</strong> Refunds will not be issued if the user claims they did not like the tool, found it difficult to use, or it did not perform as per their expectations.</li>
            <li>🛍️ <strong>Wrong or Accidental Purchase:</strong> Orders placed by mistake or regret after purchase are not eligible.</li>
            <li>📉 <strong>Trading Losses:</strong> Any losses incurred from using our educational tools are solely the user's responsibility.</li>
          </ul>

          <hr />

          <h4>✅ Refunds Will Be Considered ONLY in the Following Cases:</h4>
          <ul>
            <li>🕒 <strong>No Access Within 24 Hours:</strong> If access is not granted within 24 hours of successful payment and support fails to respond.</li>
            <li>🚫 <strong>No Delivery + No Support:</strong> If the product was not delivered at all and no support was provided after multiple contact attempts.</li>
          </ul>

          <hr />

          <h4>📝 Refund Request Conditions:</h4>
          <ul>
            <li>Must be submitted within 24 hours of purchase</li>
            <li>Must include:
              <ul>
                <li>Valid payment receipt</li>
                <li>Transaction ID</li>
                <li>Clear explanation of the issue</li>
              </ul>
            </li>
            <li>Late or incomplete requests will be rejected automatically</li>
          </ul>

          <hr />

          <h4>💳 Refund Turnaround Time:</h4>
          <ul>
            <li>Approved refunds will be processed within 5–7 working days</li>
            <li>Credited to original payment method or bank account</li>
            <li>We are not liable for bank/payment gateway delays</li>
          </ul>

          <hr />

          <h4>⚠️ Important Disclaimer:</h4>
          <ul>
            <li>All our products are digital and fall under “delivered and consumed content” as per international e-commerce policies</li>
            <li>By purchasing, you agree that once access is granted, no refund is applicable</li>
          </ul>
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
      content:
        'By purchasing from Dream Trading Club, you agree to our Terms & Conditions, Refund Policy, and Educational Disclaimer. Use of our tools is entirely at your own risk.'
    },
    {
      title: '9. Contact & Support',
      content: (
        <div style={{ backgroundColor: '#e8f4f8', padding: '20px', borderRadius: '8px' }}>
          <p><strong>WhatsApp:</strong> +91 7859991926</p>
          <p><strong>Website:</strong> www.dtctradingclub.com</p>
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
      backgroundColor: '#ffffff'
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

export default TermsCondition;
