'use client';

import { useRouter } from 'next/navigation';
import { useNotification } from '@/hooks/useNotification';
import NotificationContainer from '@/components/NotificationContainer';
import './eyelash-appointment-details.css';

export default function EyelashAppointmentDetailsPage() {
  const router = useRouter();
  const { notifications, showNotification, removeNotification } = useNotification();

  const handleClose = () => {
    showNotification('ปิดหน้ารายการนัดหมาย', 'success');
    router.push('/');
  };

  return (
    <div className="appointment-details-page">
      {/* Background Image */}
      <div className="background-section">
        <div className="background-image"></div>
      </div>

      {/* Logo Overlay */}
      <div className="logo-overlay">
        <div className="logo-circle">
          <img 
            src="/images/Group 55.png" 
            alt="PQ Logo" 
            className="logo-image"
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="main-content-card">
        {/* Page Title */}
        <h1 className="page-title">รายการนัดหมาย</h1>
        <p className="page-subtitle">รายละเอียดการนัดหมาย</p>

        {/* User Profile */}
        <div className="user-profile">
          <div className="profile-picture">
            <img 
              src="/รูปช่างต้นแบบ/Rectangle 314.png" 
              alt="Profile" 
              className="profile-image"
            />
          </div>
          <h2 className="user-name">มายด์</h2>
          <p className="appointment-time">วันที่ / เวลานัดหมาย</p>
          <p className="appointment-datetime">2025-12-01 10:00</p>
        </div>

        {/* Appointment Details Grid */}
        <div className="appointment-details-grid">
          <div className="details-column">
            <div className="detail-item">
              <span className="detail-label">ชื่อร้าน</span>
              <span className="detail-value">PrettyQueue Studio</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">ประเภทบริการ</span>
              <span className="detail-value">ต่อขนตา</span>
            </div>
          </div>
          <div className="details-column">
            <div className="detail-item">
              <span className="detail-label">สาขา</span>
              <span className="detail-value">แบร็จ 58 (BTS Bearing exit 3)</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">เบอร์โทร</span>
              <span className="detail-value">095-000-1010</span>
            </div>
          </div>
        </div>

        {/* Technician Information */}
        <div className="technician-section">
          <h3 className="technician-title">พนักงานช่าง</h3>
          <p className="technician-name">Teerada Janwichai / Mind</p>
          <div className="technician-avatar">
            <img 
              src="/รูปช่างต้นแบบ/Rectangle 310.png" 
              alt="Technician" 
              className="technician-image"
            />
          </div>
        </div>

        {/* Close Button */}
        <div className="close-button-container">
          <button className="close-button" onClick={handleClose}>
            ปิด
          </button>
        </div>

      </div>

      {/* Notifications */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </div>
  );
}
