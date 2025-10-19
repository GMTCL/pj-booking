'use client';

import { useState } from 'react';
import Link from 'next/link';
import './sub-services.css';

export default function SubServicesPage() {
  const [subServices, setSubServices] = useState([
    { id: 1, name: '', isActive: true }
  ]);

  const handleAddSubService = () => {
    const newId = subServices.length + 1;
    setSubServices([...subServices, { id: newId, name: '', isActive: true }]);
  };

  const handleDeleteSubService = (id: number) => {
    setSubServices(subServices.filter(service => service.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setSubServices(subServices.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const handleNameChange = (id: number, name: string) => {
    setSubServices(subServices.map(service => 
      service.id === id ? { ...service, name } : service
    ));
  };

  const handleSave = () => {
    // Navigate to booking settings page
    window.location.href = '/backoffice/services/booking-settings';
  };

  const handleCancel = () => {
    console.log('Cancelling...');
    // Handle cancel logic here
  };

  return (
    <div className="sub-services-page">
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
                    placeholder="กรอกชื่อบริการ"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">รายละเอียด</label>
                  <textarea
                    className="form-textarea"
                    placeholder="กรอกรายละเอียดบริการ"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-services Section */}
          <div className="sub-services-section">
            <div className="section-header">
              <h2 className="section-title">บริการย่อย ({subServices.length}/2)</h2>
              <button className="add-button" onClick={handleAddSubService}>
                + เพิ่ม
              </button>
            </div>

            <div className="sub-services-list">
              {subServices.map((service) => (
                <div key={service.id} className="sub-service-card">
                  <div className="card-header">
                    <div className="image-upload-small">
                      <div className="upload-icon-small">📷</div>
                    </div>
                    <div className="card-actions">
                      <button className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={service.isActive}
                          onChange={() => handleToggleActive(service.id)}
                          className="toggle-input"
                        />
                        <span className="toggle-slider"></span>
                      </button>
                      <button className="action-btn edit-btn">✏️</button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteSubService(service.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="card-footer">
                    <input
                      type="text"
                      className="service-name-input"
                      value={service.name}
                      onChange={(e) => handleNameChange(service.id, e.target.value)}
                      placeholder="ชื่อบริการ"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="footer-buttons">
            <button className="cancel-button" onClick={handleCancel}>
              ยกเลิก
            </button>
            <button className="save-button" onClick={handleSave}>
              บันทึกและแก้ไขต่อ
            </button>
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
