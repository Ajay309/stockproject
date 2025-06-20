import React, { useEffect, useState } from 'react';
import { getSettings } from '../../api'; // adjust the path if necessary


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
    },
    {
      icon: '/assets/logos/quality.png',
      value: aboutSetting.experience,
    },
    {
      icon: '/assets/logos/client2.png',
      value: aboutSetting.happy_smile,
    },
    {
      icon: '/assets/logos/earth.png',
      value: aboutSetting.students,
    },
  ];

  return (
    <section id="community" style={{ padding: '60px 0', background: '#f9f9f9' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '52px', fontWeight: 'bold' }}>Our Community</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              width: '300px',
              padding: '30px 20px',
              textAlign: 'center',
              transition: 'transform 0.3s',
            }}
            className="stat-card"
          >
            <img src={item.icon} alt={item.label} style={{ width: '60px', marginBottom: '15px' }} />
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#222' }}>
              {item.value}
            </div>
            <div style={{ fontSize: '16px', color: '#555', marginTop: '5px' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
