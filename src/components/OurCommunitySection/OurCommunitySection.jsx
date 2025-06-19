import React, { useEffect, useState } from 'react';

const CommunitySection = () => {
  const [aboutSetting, setAboutSetting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dtc.sinfode.com/api/v1/settings')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setAboutSetting(data.data.about_setting);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching settings:', err);
        setLoading(false);
      });
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
