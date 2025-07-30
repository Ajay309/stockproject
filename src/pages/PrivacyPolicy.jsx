import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer/Footer';

const PrivacyPolicy = () => {
  return (
    <div>
    <div className="container my-5 pt-5 pb-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 pt-5">🔒 Privacy Policy</h2>

        <Section title="1. Introduction">
          <p>Dream Trading Club (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our services or access our website <a href="https://www.dtctradingclub.com" target="_blank" rel="noopener noreferrer">www.dtctradingclub.com</a></p>
          <p>By using our platform, purchasing our products, or engaging with our services, you agree to the terms of this Privacy Policy.</p>
        </Section>

        <Section title="2. Who We Are">
          <p>Dream Trading Club is an educational platform offering digital tools and resources to help individuals learn about technical analysis, trading psychology, and market behavior.</p>
          <p><strong>Note:</strong> We are not SEBI-registered and do not offer investment advice. Our offerings are for educational purposes only.</p>
        </Section>

        <Section title="3. Information We Collect">
          <h6>a. Personal Identification Information</h6>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Country or region</li>
            <li>Payment details (processed via third-party gateway)</li>
          </ul>
          <h6>b. Transactional & Access Data</h6>
          <ul>
            <li>Product purchase history</li>
            <li>Access logs for tools, videos, and PDFs</li>
            <li>Communication via WhatsApp or email</li>
          </ul>
          <h6>c. Technical Data</h6>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Cookies and usage tracking data</li>
          </ul>
        </Section>

        <Section title="4. How We Use Your Information">
          <ul>
            <li>To deliver purchased products and services</li>
            <li>To provide customer and WhatsApp support</li>
            <li>To send transactional emails</li>
            <li>To enhance platform security and user experience</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p><strong>We do not sell or rent your data to any third party.</strong></p>
        </Section>

        <Section title="5. Payment Processing">
          <p>All transactions are securely processed through our payment partners. We do not store any credit/debit card details or sensitive payment info.</p>
          <p>Payments are accepted only via:</p>
          <ul>
            <li>Our official website: <a href="https://www.dtctradingclub.com" target="_blank" rel="noopener noreferrer">www.dtctradingclub.com</a></li>
            <li>Authorized Dream Trading Club representatives</li>
          </ul>
        </Section>

        <Section title="6. Data Sharing & Disclosure">
          <ul>
            <li>With trusted third-party service providers for operational needs</li>
            <li>To comply with legal obligations or court orders</li>
            <li>To enforce our Terms & Conditions or protect our rights</li>
          </ul>
          <p><strong>We do not share your personal data with any marketing or advertising agencies.</strong></p>
        </Section>

        <Section title="7. User Rights & Responsibilities">
          <h6>Rights:</h6>
          <ul>
            <li>Request access to your data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent (where applicable)</li>
          </ul>
          <h6>Responsibilities:</h6>
          <ul>
            <li>Provide accurate and up-to-date information</li>
            <li>Use our content for educational purposes only</li>
            <li>Do not share, resell, or misuse our tools/materials</li>
          </ul>
        </Section>

        <Section title="8. Data Storage & Retention">
          <p>We retain user data as long as needed to:</p>
          <ul>
            <li>Fulfill policy purposes</li>
            <li>Provide support/services</li>
            <li>Comply with legal/tax obligations</li>
          </ul>
          <p>Data is securely deleted when no longer needed.</p>
        </Section>

        <Section title="9. Cookies & Tracking">
          <p>We may use cookies to improve functionality and experience:</p>
          <ul>
            <li>Understand user interaction with the site</li>
            <li>Store login/session preferences</li>
          </ul>
          <p>Users can manage cookies via browser settings.</p>
        </Section>

        <Section title="10. Children’s Privacy">
          <p>Services are not intended for individuals under 18. No data is knowingly collected from minors. If discovered, such data is deleted immediately.</p>
        </Section>

        <Section title="11. Security Measures">
          <ul>
            <li>SSL encryption for transactions</li>
            <li>Secure access controls</li>
            <li>Internal compliance and confidentiality policies</li>
          </ul>
          <p><strong>Note:</strong> No online system is 100% secure. Users must also secure their own devices/accounts.</p>
        </Section>

        <Section title="12. Policy Changes & Updates">
          <p>This policy may be updated. Users should check this page regularly for changes.</p>
        </Section>

        <Section title="13. Third-Party Links">
          <p>We are not responsible for the privacy practices of external sites linked from our website. Please review their policies separately.</p>
        </Section>

        <Section title="14. Grievances & Contact Information">
          <p>📧 Email: <a href="mailto:support@dtcclub.in">support@dtcclub.in</a><br />
            📞 WhatsApp: <a href="https://wa.me/917859991926" target="_blank" rel="noopener noreferrer">+91 78599 91926</a><br />
            🌐 Website: <a href="https://www.dtctradingclub.com" target="_blank" rel="noopener noreferrer">www.dtctradingclub.com</a></p>
        </Section>
      </div>
    </div>
      <Footer />
      </div> 
  );
};

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h5 className="fw-bold border-bottom pb-2">{title}</h5>
    {children}
  </div>
);

export default PrivacyPolicy;
