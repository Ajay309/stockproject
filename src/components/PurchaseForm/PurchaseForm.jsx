import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./PurchaseForm.css";
import Animated from "../Animated.jsx";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PurchaseForm = () => {
  const { packageId, planId } = useParams();
  const { userProfile } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState([]);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch Plan
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(
          `https://admin.dtctradingclub.com/api/v1/packages/${packageId}/plans`
        );
        const result = await res.json();
        const found = result.data.find(
          (p) => String(p.id) === String(planId)
        );
        if (found) setPlan(found);
        else {
          alert("❌ Plan not found");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
        alert("Failed to load plan.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [packageId, planId, navigate]);

  // ✅ Fetch Crypto Wallets
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await fetch("https://admin.dtctradingclub.com/api/v1/qr-code");
        const result = await res.json();
        if (result.status === "success") {
          setWallets(result.data);
        }
      } catch (error) {
        console.error("Error loading wallets:", error);
      }
    };
    fetchWallets();
  }, []);

  // ✅ Handle Card Payment (Cosmofeed)
  const handleCosmofeedPayment = () => {
    if (plan?.cosmofeed_link) {
      window.open(plan.cosmofeed_link, "_blank");
    } else {
      alert("❗ Cosmofeed link not available.");
    }
  };

  // ✅ Handle Crypto Payment Modal
  const openCryptoModal = (type) => {
    const wallet = wallets.find(
      (w) => w.addresh_type.toLowerCase() === type.toLowerCase()
    );
    if (wallet) {
      setSelectedWallet(wallet);
      setShowCryptoModal(true);
    } else {
      alert(`${type} wallet not found`);
    }
  };

  const handleCopy = () => {
    if (selectedWallet?.addresh) {
      navigator.clipboard.writeText(selectedWallet.addresh);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading your plan...</p>
    </div>
  );
  
  if (!plan) return null;

  const currencySymbol = plan.currency === "USD" ? "$" : "₹";

  return (
    <Animated animation="fade-up" delay={40}>
      <div className="purchase-container">
        <div className="purchase-card">
          {/* Header Section */}
          <div className="purchase-header">
            <div className="plan-badge">{plan.name}</div>
            <h2 className="plan-title">Get Started with {plan.name}</h2>
            <p className="plan-description">
              {plan.description || "Premium trading package designed for success"}
            </p>
          </div>

          {/* Pricing Section */}
          <div className="pricing-section">
            <div className="price-display">
              <span className="currency">{currencySymbol}</span>
              <span className="amount">{plan.discount_price}</span>
            </div>
            <div className="price-label">Total Payable</div>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h4 className="methods-title">Choose Payment Method</h4>
            
            {/* Card Payment */}
            <div className="payment-option primary-option">
              <div className="option-content">
                <div className="option-icon">💳</div>
                <div className="option-info">
                  <h5>Credit/Debit Card</h5>
                  <p>Secure payment via Cosmofeed</p>
                </div>
              </div>
              <Button 
                variant="primary" 
                className="pay-btn"
                onClick={handleCosmofeedPayment}
              >
                Pay Now
              </Button>
            </div>

            {/* Crypto Payments */}
            <div className="crypto-options">
              {wallets.some((w) => w.addresh_type === "TRC20") && (
                <div className="payment-option crypto-option">
                  <div className="option-content">
                    <div className="option-icon">₿</div>
                    <div className="option-info">
                      <h5>Crypto (TRC20)</h5>
                      <p>USDT, USDC, TRX</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline-dark" 
                    className="pay-btn"
                    onClick={() => openCryptoModal("TRC20")}
                  >
                    Select
                  </Button>
                </div>
              )}

              {wallets.some((w) => w.addresh_type === "BTC") && (
                <div className="payment-option crypto-option">
                  <div className="option-content">
                    <div className="option-icon">₿</div>
                    <div className="option-info">
                      <h5>Bitcoin (BTC)</h5>
                      <p>Bitcoin Network</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline-dark" 
                    className="pay-btn"
                    onClick={() => openCryptoModal("BTC")}
                  >
                    Select
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="purchase-footer">
            <Button 
              variant="outline-secondary" 
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back to Plans
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Enhanced Crypto Modal */}
      <Modal
        show={showCryptoModal}
        onHide={() => {
          setShowCryptoModal(false);
          setCopied(false);
        }}
        centered
        className="crypto-modal"
      >
        <Modal.Header className="modal-header-custom">
          <Modal.Title>
            <div className="modal-title-content">
              <span className="crypto-icon">₿</span>
              <div>
                <h4>Pay with {selectedWallet?.addresh_type || "Crypto"}</h4>
                <p className="modal-subtitle">Send exact amount to continue</p>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="modal-body-custom text-center">
          {selectedWallet ? (
            <>
              {/* QR Code */}
              <div className="qr-container">
                <img
                  src={selectedWallet.image}
                  alt={selectedWallet.addresh_type}
                  className="qr-code"
                />
              </div>

              {/* Payment Info */}
              <div className="payment-info">
                <div className="amount-display">
                  <span className="amount-label">Send Exactly:</span>
                  <span className="amount-value">
                    {currencySymbol}{plan.discount_price} worth of {selectedWallet.addresh_type}
                  </span>
                </div>
                
                {/* Address with Copy Functionality */}
                <div className="address-section">
                  <label className="address-label">Wallet Address:</label>
                  <div className="address-input-group">
                    <div className="address-display">
                      {selectedWallet.addresh}
                    </div>
                    <button 
                      className={`copy-btn ${copied ? 'copied' : ''}`}
                      onClick={handleCopy}
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="important-notes">
                  <div className="note-item">
                    <span className="note-icon">⚠️</span>
                    <span>Send only {selectedWallet.addresh_type} on correct network</span>
                  </div>
                  <div className="note-item">
                    <span className="note-icon">⏱️</span>
                    <span>Payment will be confirmed within 15-30 minutes</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="loading-wallet">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading wallet information...</p>
            </div>
          )}
        </Modal.Body>
        
        <Modal.Footer className="modal-footer-custom">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowCryptoModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              setShowCryptoModal(false);
              // Add confirmation logic here if needed
            }}
          >
            I've Sent Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Animated>
  );
};

export default PurchaseForm;