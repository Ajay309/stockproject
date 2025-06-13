import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ContactUsSection.css';

const ContactUsSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const [mapCoords, setMapCoords] = useState({
        latitude: '',
        longitude: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('https://dtc.sinfode.com/api/v1/settings');
                const result = await response.json();
                if (result.status === "success") {
                    const lat = result.data.common_setting.map_latitude;
                    const lng = result.data.common_setting.map_longitude;
                    setMapCoords({ latitude: lat, longitude: lng });
                    console.log('Map coordinates fetched:', lat, lng);
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://dtc.sinfode.com/api/v1/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone_number: '',
                message: ''
            });
        } catch (err) {
            setError(err.message || 'Failed to submit form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <section className="contact-section py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="bg-white shadow rounded overflow-hidden">
                                <div className="p-4 text-center" style={{ background: '#f6b40e', color: '#fff' }}>
                                    <h2 className="fw-bold mb-3">Thank You!</h2>
                                    <p className="mb-0">Your message has been received. We will get back to you soon.</p>
                                </div>
                                <div className="p-5 text-center">
                                    <div className="mb-4" style={{
                                        width: '80px',
                                        height: '80px',
                                        margin: '0 auto',
                                        background: '#f6b40e',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="bi bi-check-lg" style={{ fontSize: '40px', color: '#fff' }}></i>
                                    </div>
                                    <p className="text-muted mb-4">We appreciate your interest in our services.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="btn btn-primary px-4 py-2"
                                        style={{
                                            background: '#f6b40e',
                                            border: 'none',
                                            fontWeight: 600,
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={e => {
                                            e.target.style.background = '#e6a800';
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 4px 12px #f6b40e';
                                        }}
                                        onMouseOut={e => {
                                            e.target.style.background = '#f6b40e';
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="contact-section py-5">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 text-center">
                        <h2 className="fw-bold mb-3">Get In Touch</h2>
                        <p className="text-muted">We'd love to hear from you! Please fill out the form below or use our contact information.</p>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-4 mb-4">
                        <div className="contact-info-item p-4 bg-white shadow rounded">
                            <div className="contact-icon mb-3">
                                <i className="bi bi-geo-alt"></i>
                            </div>
                            <h5>Our Location</h5>
                            <p className="text-muted">Dream Trading club <br />Sikar Rajasthan India - 302021</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="contact-info-item p-4 bg-white shadow rounded">
                            <div className="contact-icon mb-3">
                                <i className="bi bi-envelope"></i>
                            </div>
                            <h5>Email Us</h5>
                            <p className="text-muted"> dtcclub1@gmail.com<br />Support@Dtcclub.com</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="contact-info-item p-4 bg-white shadow rounded">
                            <div className="contact-icon mb-3">
                                <i className="bi bi-telephone"></i>
                            </div>
                            <h5>Call Us</h5>
                            <p className="text-muted">+917976326147<br />+49 17623312943</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-5">
                        <h2>Send Us A Message</h2>
                        <form onSubmit={handleSubmit} className="contact-form bg-white shadow rounded p-4">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control mb-3"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control mb-3"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        className="form-control mb-3"
                                        placeholder="Phone Number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <textarea
                                        name="message"
                                        className="form-control mb-3"
                                        rows="5"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <h2>Our Location</h2>
                        <div className="map-container rounded overflow-hidden shadow">
                            {mapCoords.latitude && mapCoords.longitude ? (
                                <iframe
                                    src={`https://www.google.com/maps?q=${mapCoords.latitude},${mapCoords.longitude}&z=15&output=embed`}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            ) : (
                                <p>Loading map...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsSection;
