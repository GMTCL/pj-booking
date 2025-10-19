'use client';

import { useState } from 'react';
import Link from 'next/link';
import './services.css';

export default function ServicesPage() {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const handleSave = () => {
    // Navigate to sub-services page
    window.location.href = '/backoffice/services/sub-services';
  };

  const handleAddSubService = () => {
    console.log('Adding sub-service...');
    // Handle add sub-service logic here
  };

  return (
    <div className="services-page">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="logo">PrettyQueue</h1>
          <div className="user-profile">
            <div className="profile-icon">👤</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <div className="nav-container">
          <button className="nav-arrow left">‹</button>
          <div className="nav-items">
            <Link href="/backoffice/main-dashboard" className="nav-item">หน้าหลัก</Link>
            <Link href="/backoffice/shop" className="nav-item">ร้านค้า</Link>
            <Link href="/backoffice/services" className="nav-item active">บริการ</Link>
            <Link href="/backoffice/staff" className="nav-item">ช่างบริการ</Link>
            <Link href="/backoffice/customers" className="nav-item">ข้อมูลลูกค้า</Link>
          </div>
          <button className="nav-arrow right">›</button>
          <div className="nav-manage">
            <span className="manage-text">จัดการคิว</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          
          {/* Service Settings Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่าบริการ</h2>
              <button className="edit-button">
                <div className="edit-icon">✏️</div>
              </button>
            </div>

            <div className="service-form">
              <div className="image-upload-section">
                <div className="image-upload">
                  <div className="upload-box">
                    <div className="upload-icon">🏔️</div>
                  </div>
                  <div className="upload-info">ขนาด 1:1</div>
                </div>
              </div>

              <div className="form-fields">
                <div className="form-field">
                  <label className="field-label">ชื่อบริการ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="กรอกชื่อบริการ"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">รายละเอียด</label>
                  <textarea
                    className="form-textarea"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    placeholder="กรอกรายละเอียดบริการ"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="add-subservice-button" onClick={handleAddSubService}>
                เพิ่มบริการย่อย
              </button>
              <button className="save-button" onClick={handleSave}>
                บันทึกและแก้ไขต่อ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-content">
          <span className="copyright">Copyright © PrettyQueue</span>
        </div>
      </div>
    </div>
  );
}
