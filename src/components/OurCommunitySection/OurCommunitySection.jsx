import React, { useEffect, useState } from 'react';

const CountUp = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (isNaN(end)) return;

    const duration = 2000; // 2 seconds
    const incrementTime = 20;
    const step = Math.ceil(end / (duration / incrementTime));

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(counter);
  }, [target]);

  return <span>{count}</span>;
};

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
      label: 'Students',
      icon: '/assets/logos/employee2.png',
      value: aboutSetting.employee,
    },
    {
      label: 'Happy Clients',
      icon: '/assets/logos/quality.png',
      value: aboutSetting.experience,
    },
    {
      label: 'Years of Experience',
      icon: '/assets/logos/client2.png',
      value: aboutSetting.happy_smile,
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
              width: '250px',
              padding: '30px 20px',
              textAlign: 'center',
              transition: 'transform 0.3s',
            }}
            className="stat-card"
          >
            <img src={item.icon} alt={item.label} style={{ width: '60px', marginBottom: '15px' }} />
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#222' }}>
              <CountUp target={item.value} />
            </div>
            <div style={{ fontSize: '16px', color: '#555', marginTop: '5px' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
