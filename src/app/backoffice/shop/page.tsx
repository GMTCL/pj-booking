'use client';

import { useState } from 'react';
import Link from 'next/link';
import './shop.css';

export default function ShopPage() {
  const [businessName, setBusinessName] = useState('');
  const [shopDetails, setShopDetails] = useState('');
  const [shopColor, setShopColor] = useState('#FF0FE3');
  const [currency, setCurrency] = useState('THB');
  const [bookingFlow, setBookingFlow] = useState('service');

  const handleSave = () => {
    // Navigate to shop settings page
    window.location.href = '/backoffice/shop-settings';
  };

  const handleCancel = () => {
    console.log('Canceling...');
    // Handle cancel logic here
  };

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1 className="app-title">PrettyQueue</h1>
        </div>
        <div className="header-right">
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
            <Link href="/backoffice/shop" className="nav-item active">ร้านค้า</Link>
            <Link href="/backoffice/services" className="nav-item">บริการ</Link>
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
          {/* Shop Settings Section */}
          <div className="shop-settings-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่าร้านค้า</h2>
              <button className="edit-button">
                <div className="edit-icon">✏️</div>
              </button>
            </div>
            
            {/* Profile Image Upload and Form Fields */}
            <div className="profile-and-form-section">
              <div className="image-upload-container">
                <div className="image-upload-item">
                  <label className="field-label">รูปภาพโปรไฟล์</label>
                  <div className="image-upload-box">
                    <div className="upload-placeholder">
                      <div className="upload-icon">📷</div>
                    </div>
                    <div className="image-size-text">ขนาด 1:1</div>
                  </div>
                </div>
                <div className="image-upload-item">
                  <label className="field-label">รูปภาพโปรไฟล์</label>
                  <div className="image-upload-box">
                    <div className="upload-placeholder">
                      <div className="upload-icon">📷</div>
                    </div>
                    <div className="image-size-text">ขนาด 1:1</div>
                  </div>
                </div>
              </div>

              <div className="form-fields-container">
                {/* Business Name */}
                <div className="form-field">
                  <label className="field-label">ชื่อธุรกิจ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="กรอกชื่อธุรกิจ"
                  />
                </div>

                {/* Shop Details */}
                <div className="form-field">
                  <label className="field-label">รายละเอียดร้านค้า</label>
                  <textarea
                    className="form-textarea"
                    value={shopDetails}
                    onChange={(e) => setShopDetails(e.target.value)}
                    placeholder="กรอกรายละเอียดร้านค้า"
                    rows={3}
                  />
                </div>

                {/* Shop Color */}
                <div className="form-field shop-color-field">
                  <label className="field-label">สีร้านค้า</label>
                  <div className="color-input-container">
                    <div className="color-preview" style={{ backgroundColor: shopColor }}></div>
                    <input
                      type="text"
                      className="color-input"
                      value={shopColor}
                      onChange={(e) => setShopColor(e.target.value)}
                    />
                  </div>
                </div>

                {/* Currency */}
                <div className="form-field currency-field">
                  <label className="field-label">หน่วยเงิน</label>
                  <select
                    className="form-select"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="THB">THB (Baht)</option>
                    <option value="USD">USD (Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>

                {/* Booking Flow Options */}
                <div className="form-field booking-flow-field">
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="bookingFlow"
                        value="date"
                        checked={bookingFlow === 'date'}
                        onChange={() => setBookingFlow('date')}
                        className="radio-input"
                      />
                      <span className="radio-label">เลือกวันที่ก่อน</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="bookingFlow"
                        value="service"
                        checked={bookingFlow === 'service'}
                        onChange={() => setBookingFlow('service')}
                        className="radio-input"
                      />
                      <span className="radio-label">เลือกบริการก่อน</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example Section */}
          <div className="example-section">
            <h2 className="section-title">ตัวอย่าง</h2>
            <div className="example-preview">
              <div className="preview-profile">
                <div className="preview-avatar">
                  <div className="preview-avatar-icon">👤</div>
                </div>
                <h3 className="preview-business-name">Salon Gold</h3>
                <p className="preview-branch">Salon Gold สาขา 1</p>
              </div>
              <div className="preview-services">
                <h4 className="preview-services-title">ประเภทบริการ</h4>
                <div className="preview-services-grid">
                  <div className="preview-service-card">
                    <img src="/images/salon-service-1.png" alt="สระ/ไดร์" className="service-image" />
                    <span className="service-name">สระ/ไดร์</span>
                  </div>
                  <div className="preview-service-card">
                    <img src="/images/salon-service-2.png" alt="ย้อมผม" className="service-image" />
                    <span className="service-name">ย้อมผม</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="preview-actions">
              <button className="cancel-button" onClick={handleCancel}>ยกเลิก</button>
              <button className="save-button" onClick={handleSave}>บันทึก</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
