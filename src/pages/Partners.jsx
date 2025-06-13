import React from 'react';
import Footer from '../components/Footer/Footer';

const partnersData = [
  {
    name: 'AlphaInvest',
    logo: 'https://via.placeholder.com/100x50?text=AlphaInvest',
    description: 'Leading brokerage firm providing real-time stock analysis and research tools.',
    color: '#3498db'
  },
  {
    name: 'TradeGuru',
    logo: 'https://via.placeholder.com/100x50?text=TradeGuru',
    description: 'Trusted financial advisor offering expert insights for smart investing.',
    color: '#2ecc71'
  },
  {
    name: 'FinTechX',
    logo: 'https://via.placeholder.com/100x50?text=FinTechX',
    description: 'Innovative fintech partner delivering seamless trading technology.',
    color: '#e74c3c'
  },
];

const Partners = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      paddingTop: '100px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>Our Trusted Partners</h1>
        
        <p style={{
          textAlign: 'center',
          color: '#7f8c8d',
          fontSize: '1.1rem',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          We collaborate with industry leaders to provide you with the best trading experience
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          padding: '20px'
        }}>
          {partnersData.map((partner, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                }
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                width: '100%',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                padding: '10px'
              }}>
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              <h3 style={{
                color: partner.color,
                fontSize: '1.5rem',
                marginBottom: '15px',
                textAlign: 'center'
              }}>{partner.name}</h3>
              
              <p style={{
                color: '#34495e',
                fontSize: '1rem',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Partners;
