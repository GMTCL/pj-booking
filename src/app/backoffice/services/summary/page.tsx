'use client';

import { useState } from 'react';
import Link from 'next/link';
import './summary.css';

export default function SummaryPage() {
  const [price, setPrice] = useState('500');
  const [discountedPrice, setDiscountedPrice] = useState('450');
  const [selectedDays, setSelectedDays] = useState(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: '09:00', endTime: '10:00', bookings: 2 },
    { id: 2, startTime: '10:00', endTime: '11:00', bookings: 3 },
    { id: 3, startTime: '11:00', endTime: '12:00', bookings: 1 },
    { id: 4, startTime: '14:00', endTime: '15:00', bookings: 4 },
    { id: 5, startTime: '15:00', endTime: '16:00', bookings: 2 },
    { id: 6, startTime: '16:00', endTime: '17:00', bookings: 3 },
    { id: 7, startTime: '17:00', endTime: '18:00', bookings: 1 }
  ]);

  const days = [
    { id: 'monday', label: 'จันทร์' },
    { id: 'tuesday', label: 'อังคาร' },
    { id: 'wednesday', label: 'พุธ' },
    { id: 'thursday', label: 'พฤหัสบดี' },
    { id: 'friday', label: 'ศุกร์' },
    { id: 'saturday', label: 'เสาร์' },
    { id: 'sunday', label: 'อาทิตย์' }
  ];

  const handleEdit = () => {
    // Navigate back to booking settings
    window.location.href = '/backoffice/services/booking-settings';
  };

  const handleSave = () => {
    // Navigate to all services page
    window.location.href = '/backoffice/services/all-services';
  };

  const handleCancel = () => {
    console.log('Cancelling...');
    // Handle cancel logic here
  };

  return (
    <div className="summary-page">
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
          
          {/* Booking Settings Summary */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่าการจอง</h2>
              <button className="edit-button" onClick={handleEdit}>
                <div className="edit-icon">✏️</div>
              </button>
            </div>

            <div className="summary-content">
              {/* Price Section */}
              <div className="price-section">
                <div className="form-field price-field">
                  <label className="field-label">ราคา</label>
                  <div className="price-display">{price} บาท</div>
                </div>

                <div className="form-field discounted-price-field">
                  <label className="field-label">ราคาหลังหักส่วนลด</label>
                  <div className="price-display">{discountedPrice} บาท</div>
                </div>
              </div>

              {/* Days Selection */}
              <div className="days-section">
                <div className="days-grid">
                  {days.map((day) => (
                    <div
                      key={day.id}
                      className={`day-button ${selectedDays.includes(day.id) ? 'selected' : ''}`}
                    >
                      {day.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots Table */}
              <div className="time-section">
                <div className="time-slots-table">
                  <div className="table-header">
                    <div className="header-cell">เวลาเริ่มต้น</div>
                    <div className="header-cell">เวลาสิ้นสุด</div>
                    <div className="header-cell">จำนวนการจอง (ครั้ง)</div>
                    <div className="header-cell">ลบ</div>
                  </div>

                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="table-row">
                      <div className="time-cell">
                        <span className="time-display">{slot.startTime}</span>
                        <span className="time-suffix">น.</span>
                      </div>
                      <div className="time-cell">
                        <span className="time-display">{slot.endTime}</span>
                        <span className="time-suffix">น.</span>
                      </div>
                      <div className="bookings-cell">
                        <span className="bookings-display">{slot.bookings}</span>
                      </div>
                      <div className="delete-cell">
                        <span className="delete-icon">🗑️</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="add-time-button">
                  + เพิ่มช่วงเวลา
                </button>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="cancel-button" onClick={handleCancel}>
                  ยกเลิก
                </button>
                <button className="save-button" onClick={() => {
                  console.log('Navigating to payment settings...');
                  // ใช้ setTimeout เพื่อให้แน่ใจว่า navigation ทำงาน
                  setTimeout(() => {
                    window.location.href = '/backoffice/payment-settings';
                  }, 100);
                }}>
                  บันทึกและแก้ไขต่อ
                </button>
              </div>
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
