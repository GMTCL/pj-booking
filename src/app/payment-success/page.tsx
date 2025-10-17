'use client';

import { useRouter } from 'next/navigation';
import { useNotification } from '@/hooks/useNotification';
import NotificationContainer from '@/components/NotificationContainer';
import './payment-success.css';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { notifications, showNotification, removeNotification } = useNotification();

  const handleConfirm = () => {
    showNotification('ยืนยันการชำระเงินเรียบร้อย!', 'success');
    router.push('/appointment-details');
  };

  return (
    <div className="payment-success-page">
      {/* Success Icon */}
      <div className="success-icon-container">
        <div className="success-checkmark">✓</div>
      </div>

      {/* Success Title */}
      <h1 className="success-title">ยืนยันการชำระเงิน</h1>

      {/* Success Message */}
      <p className="success-message">
        การชำระเงินของคุณสำเร็จแล้ว ขอบคุณลูกค้าที่ใช้บริการ ทางร้านจะแจ้งรายละเอียดผ่านช่องทาง Line
      </p>

      {/* Confirm Button */}
      <div className="confirm-button-container">
        <button 
          className="confirm-button" 
          onClick={handleConfirm}
        >
          ยืนยัน
        </button>
      </div>

      {/* Notifications */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </div>
  );
}
