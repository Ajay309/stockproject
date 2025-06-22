import React, { useEffect, useState } from 'react';
import { getSettings } from '../../api'; // adjust the path if necessary
import Animated from '../Animated';


const CommunitySection = () => {
  const [aboutSetting, setAboutSetting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setAboutSetting(data.about_setting); // we only need about_setting
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSettings();
  }, []);
  

  if (loading) return <div>Loading Community Info...</div>;
  if (!aboutSetting) return <div>No data available</div>;

  const stats = [
    {
      icon: '/assets/logos/employee2.png',
      value: aboutSetting.employee,
      // label: 'Employees',
    },
    {
      icon: '/assets/logos/quality.png',
      value: aboutSetting.experience,
      // label: 'Years Experience',
    },
    {
      icon: '/assets/logos/client2.png',
      value: aboutSetting.happy_smile,
      // label: 'Happy Clients',
    },
    {
      icon: '/assets/logos/earth.png',
      value: aboutSetting.students,
      // label: 'Students',
    },
  ];

  return (
    <section id="community" style={{ padding: '60px 0', background: '#f9f9f9' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Animated animation="fade-up" delay={100}>
          <h2 className="community-title" style={{ fontSize: '3rem', fontWeight: 'bold' }}>Our Community</h2>
        </Animated>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
        {stats.map((item, index) => (
          <Animated key={index} animation="fade-up" delay={100 + index * 100}>
            <div
              className="community-stat stat-card community-stat-card"
              style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                width: '300px',
                height: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px 20px',
                textAlign: 'center',
                transition: 'transform 0.3s',
              }}
            >
              <img src={item.icon} alt={item.label} style={{ width: '60px', marginBottom: '15px' }} />
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#222' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '16px', color: '#555', marginTop: '5px' }}>{item.label}</div>
            </div>
          </Animated>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
