'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/hooks/useNotification';
import NotificationContainer from '@/components/NotificationContainer';
import './payment.css';

export default function PaymentPage() {
  const router = useRouter();
  const { notifications, showNotification, removeNotification } = useNotification();
  
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    showNotification('ชำระเงินสำเร็จ! จองคิวเรียบร้อย', 'success');
    // Navigate to payment success page
    setTimeout(() => {
      router.push('/payment-success');
    }, 1000);
  };

  return (
    <div className="payment-page">
      {/* Header */}
      <div className="payment-header">
        <button 
          className="back-button"
          onClick={() => router.push('/personal-info')}
        >
          ←
        </button>
        <h1 className="payment-title">ชำระเงิน</h1>
        <button 
          className="close-button"
          onClick={() => router.push('/')}
        >
          ✕
        </button>
      </div>

      {/* Progress Tracker */}
      <div className="progress-tracker">
        <div className="progress-step completed">
          <span className="step-text">เลือกวัน / เวลา</span>
          <div className="step-circle completed"></div>
        </div>
        <div className="progress-step completed">
          <span className="step-text">ประวัติส่วนตัว</span>
          <div className="step-circle completed"></div>
        </div>
        <div className="progress-step active">
          <span className="step-text">ชำระเงิน</span>
          <div className="step-circle active"></div>
        </div>
        <div className="progress-line step-3"></div>
      </div>


      {/* QR Code Section */}
      <div className="section">
        <h3 className="section-title">สแกน QR Code เพื่อชำระเงิน</h3>
        <div className="qr-section">
          <div className="qr-code-container">
            <img 
              src="/รูปช่างต้นแบบ/qr/Group 633136.png" 
              alt="QR Code" 
              className="qr-code"
            />
          </div>
          <p className="qr-timer">QR Code จะหมดอายุใน 00:00:00</p>
          <button className="save-qr-button">บันทึก QR Code</button>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="section">
        <h3 className="section-title">สรุปการชำระเงิน</h3>
        <div className="transaction-summary">
          <div className="summary-item">
            <span className="summary-label">Transfer Amount:</span>
            <span className="summary-value">B 500.00</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Additional Cost:</span>
            <span className="summary-value">B 0</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item total">
            <span className="summary-label">Total:</span>
            <span className="summary-value">B 500.00</span>
          </div>
        </div>
      </div>

      {/* Payment Confirmation */}
      {paymentConfirmed && (
        <div className="payment-success">
          <div className="success-icon">✅</div>
          <h3 className="success-title">ชำระเงินสำเร็จ!</h3>
          <p className="success-message">จองคิวเรียบร้อยแล้ว กำลังกลับไปหน้าแรก...</p>
        </div>
      )}

      {/* Next Button */}
      {!paymentConfirmed && (
        <div className="next-button-container">
          <button 
            className="next-button" 
            onClick={handleConfirmPayment}
          >
            ถัดไป
          </button>
        </div>
      )}

      {/* Notifications */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </div>
  );
}
