import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';

const guides = [
  {
    id: 'beginners',
    title: "📘 Beginner's Guide",
    description: 'New to trading? This guide covers the basics of stocks, market orders, how to read charts, and risk management.',
    content: 'Learn the fundamental concepts of stock market trading, including market terminology, order types, and basic chart analysis. Perfect for those just starting their trading journey.'
  },
  {
    id: 'technical',
    title: '📊 Technical Analysis',
    description: 'Understand chart patterns, indicators like RSI, MACD, moving averages, and how to use them in trades.',
    content: 'Master the art of technical analysis with comprehensive guides on chart patterns, technical indicators, and market analysis tools. Learn how to make informed trading decisions based on market data.'
  },
  {
    id: 'strategies',
    title: '📈 Trading Strategies',
    description: 'Explore popular strategies like swing trading, day trading, scalping, and momentum trading.',
    content: 'Discover various trading strategies and learn how to implement them effectively. From day trading to long-term investing, find the strategy that best suits your trading style and goals.'
  },
  {
    id: 'portfolio',
    title: '💼 Portfolio Management',
    description: 'Learn how to build, monitor, and rebalance a trading portfolio based on your financial goals.',
    content: 'Understand the principles of portfolio management, including asset allocation, risk management, and portfolio optimization. Learn how to create and maintain a well-balanced investment portfolio.'
  },
  {
    id: 'tools',
    title: '🛠️ Tools & Platforms',
    description: 'A guide to using trading platforms, screeners, and apps to simplify your market analysis and execution.',
    content: 'Explore the essential tools and platforms for successful trading. Learn about charting software, trading platforms, market screeners, and other resources that can enhance your trading experience.'
  }
];

const TradingGuides = () => {
  const [activeGuide, setActiveGuide] = useState(null);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Extra spacing to push content below fixed navbar */}
      <div style={{ height: '100px' }} />
      
      <main style={{ 
        flex: 1, 
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: 'auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ 
            color: '#2c3e50',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Trading Guides</h1>
          
          <p style={{ 
            fontSize: '1.1rem',
            color: '#7f8c8d',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 40px'
          }}>
            Learn the fundamentals and strategies of stock market trading with our easy-to-understand guides.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {guides.map((guide) => (
              <div
                key={guide.id}
                style={{
                  backgroundColor: activeGuide === guide.id ? '#e8f4f8' : 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeGuide === guide.id ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
                onClick={() => setActiveGuide(activeGuide === guide.id ? null : guide.id)}
                onMouseOver={(e) => {
                  if (activeGuide !== guide.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeGuide !== guide.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                  }
                }}
              >
                <h2 style={{ 
                  color: '#2c3e50',
                  fontSize: '1.3rem',
                  marginBottom: '10px'
                }}>{guide.title}</h2>
                <p style={{ 
                  color: '#34495e',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>{guide.description}</p>
              </div>
            ))}
          </div>

          {activeGuide && (
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              padding: '30px',
              marginTop: '20px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <h3 style={{
                color: '#2c3e50',
                fontSize: '1.5rem',
                marginBottom: '15px'
              }}>
                {guides.find(g => g.id === activeGuide)?.title}
              </h3>
              <p style={{
                color: '#34495e',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                {guides.find(g => g.id === activeGuide)?.content}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TradingGuides; 