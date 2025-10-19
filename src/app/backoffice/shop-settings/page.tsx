'use client';

import { useState } from 'react';
import Link from 'next/link';
import './shop-settings.css';

export default function ShopSettingsPage() {
  // Booking Conditions State
  const [maxAdvanceDays, setMaxAdvanceDays] = useState(0);
  const [maxAdvanceHours, setMaxAdvanceHours] = useState(0);
  const [maxAdvanceMinutes, setMaxAdvanceMinutes] = useState(0);
  
  const [minAdvanceDays, setMinAdvanceDays] = useState(0);
  const [minAdvanceHours, setMinAdvanceHours] = useState(0);
  const [minAdvanceMinutes, setMinAdvanceMinutes] = useState(0);
  
  const [allowCancellation, setAllowCancellation] = useState(true);
  const [minCancelDays, setMinCancelDays] = useState(0);
  const [minCancelHours, setMinCancelHours] = useState(0);
  const [minCancelMinutes, setMinCancelMinutes] = useState(0);

  // Booking Information State
  const [requireName, setRequireName] = useState(true);
  const [requirePhone, setRequirePhone] = useState(false);
  const [requireBirthday, setRequireBirthday] = useState(false);

  // Shop Contact State
  const [shopAddress, setShopAddress] = useState('');

  const handleSave = () => {
    // Handle save logic
    console.log('Settings saved');
  };

  const handleCancel = () => {
    // Handle cancel logic
    console.log('Settings cancelled');
  };

  return (
    <div className="shop-settings-page">
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
          
          {/* Booking Conditions Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่าเงื่อนไขการจอง</h2>
              <button className="edit-button">
                <div className="edit-icon">✏️</div>
              </button>
            </div>

            <div className="form-grid">
              {/* Maximum Advance Booking */}
              <div className="form-group">
                <label className="field-label">จองล่วงหน้าสูงสุด</label>
                <div className="time-inputs">
                  <div className="time-input">
                    <span className="time-label">วัน</span>
                    <input
                      type="number"
                      value={maxAdvanceDays}
                      onChange={(e) => setMaxAdvanceDays(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                  <div className="time-input">
                    <span className="time-label">ชั่วโมง</span>
                    <input
                      type="number"
                      value={maxAdvanceHours}
                      onChange={(e) => setMaxAdvanceHours(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                  <div className="time-input">
                    <span className="time-label">นาที</span>
                    <input
                      type="number"
                      value={maxAdvanceMinutes}
                      onChange={(e) => setMaxAdvanceMinutes(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Minimum Advance Booking */}
              <div className="form-group">
                <label className="field-label">จองล่วงหน้าขั้นต่ำ</label>
                <div className="time-inputs">
                  <div className="time-input">
                    <span className="time-label">วัน</span>
                    <input
                      type="number"
                      value={minAdvanceDays}
                      onChange={(e) => setMinAdvanceDays(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                  <div className="time-input">
                    <span className="time-label">ชั่วโมง</span>
                    <input
                      type="number"
                      value={minAdvanceHours}
                      onChange={(e) => setMinAdvanceHours(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                  <div className="time-input">
                    <span className="time-label">นาที</span>
                    <input
                      type="number"
                      value={minAdvanceMinutes}
                      onChange={(e) => setMinAdvanceMinutes(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Allow Cancellation */}
              <div className="form-group">
                <label className="field-label">อนุญาตยกเลิกการจอง</label>
              </div>

              {/* Minimum Advance Cancellation */}
              <div className="form-group">
                <label className="field-label">ยกเลิกล่วงหน้าขั้นต่ำ</label>
                <div className="time-inputs">
                  <div className="time-input">
                    <span className="time-label">วัน</span>
                    <input
                      type="number"
                      value={minCancelDays}
                      onChange={(e) => setMinCancelDays(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                  <div className="time-input">
                    <span className="time-label">ชั่วโมง</span>
                    <input
                      type="number"
                      value={minCancelHours}
                      onChange={(e) => setMinCancelHours(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                  <div className="time-input">
                    <span className="time-label">นาที</span>
                    <input
                      type="number"
                      value={minCancelMinutes}
                      onChange={(e) => setMinCancelMinutes(parseInt(e.target.value) || 0)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Information Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ข้อมูลทำรายการจอง</h2>
            </div>

            <div className="toggle-group">
              <div className="toggle-item">
                <label className="toggle-label-text">ชื่อ</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="requireName"
                    checked={requireName}
                    onChange={(e) => setRequireName(e.target.checked)}
                    className="toggle-input"
                  />
                  <label htmlFor="requireName" className="toggle-label"></label>
                </div>
              </div>

              <div className="toggle-item">
                <label className="toggle-label-text">หมายเลขโทรศัพท์</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="requirePhone"
                    checked={requirePhone}
                    onChange={(e) => setRequirePhone(e.target.checked)}
                    className="toggle-input"
                  />
                  <label htmlFor="requirePhone" className="toggle-label"></label>
                </div>
              </div>

              <div className="toggle-item">
                <label className="toggle-label-text">วันเกิด</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="requireBirthday"
                    checked={requireBirthday}
                    onChange={(e) => setRequireBirthday(e.target.checked)}
                    className="toggle-input"
                  />
                  <label htmlFor="requireBirthday" className="toggle-label"></label>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Contact Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ข้อมูลติดต่อร้าน</h2>
            </div>

            <div className="image-upload">
              <div className="upload-box">
                <div className="upload-icon">📷</div>
              </div>
              <div className="upload-info">อัพโหลดไฟล์ขนาด : 10MB</div>
            </div>

            <div className="address-section">
              <label className="field-label">ที่อยู่ร้านค้า</label>
              <textarea
                className="address-textarea"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
                placeholder="ช่องทางติดต่อเจ้าหน้าที่"
                rows={4}
              />
            </div>

            {/* Footer Buttons */}
            <div className="footer-buttons">
              <button className="cancel-button" onClick={handleCancel}>
                ยกเลิก
              </button>
              <button className="save-button" onClick={handleSave}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
