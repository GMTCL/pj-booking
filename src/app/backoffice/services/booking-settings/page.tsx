'use client';

import { useState } from 'react';
import Link from 'next/link';
import './booking-settings.css';

export default function BookingSettingsPage() {
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: '00:00', endTime: '00:00', bookings: 0 },
    { id: 2, startTime: '00:00', endTime: '00:00', bookings: 0 },
    { id: 3, startTime: '00:00', endTime: '00:00', bookings: 0 },
    { id: 4, startTime: '00:00', endTime: '00:00', bookings: 0 },
    { id: 5, startTime: '00:00', endTime: '00:00', bookings: 0 },
    { id: 6, startTime: '00:00', endTime: '00:00', bookings: 0 },
    { id: 7, startTime: '00:00', endTime: '00:00', bookings: 0 }
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

  const handleDayToggle = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleTimeSlotChange = (id: number, field: 'startTime' | 'endTime' | 'bookings', value: string) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const handleDeleteTimeSlot = (id: number) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const handleAddTimeSlot = () => {
    const newId = Math.max(...timeSlots.map(slot => slot.id)) + 1;
    setTimeSlots(prev => [...prev, { id: newId, startTime: '00:00', endTime: '00:00', bookings: 0 }]);
  };

  const handleSave = () => {
    // Navigate to summary page
    window.location.href = '/backoffice/services/summary';
  };

  const handleCancel = () => {
    console.log('Cancelling...');
    // Handle cancel logic here
  };

  return (
    <div className="booking-settings-page">
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
          
          {/* Booking Settings Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่าการจอง</h2>
              <button className="edit-button">
                <div className="edit-icon">✏️</div>
              </button>
            </div>

            <div className="booking-form">
              {/* Price Section */}
              <div className="price-section">
                <div className="form-field price-field">
                  <label className="field-label">ราคา</label>
                  <input
                    type="number"
                    className="form-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="กรอกราคา"
                  />
                </div>

                <div className="form-field discounted-price-field">
                  <label className="field-label">ราคาหลังหักส่วนลด</label>
                  <input
                    type="number"
                    className="form-input"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    placeholder="กรอกราคาหลังหักส่วนลด"
                  />
                </div>
              </div>

              {/* Days Selection */}
              <div className="days-section">
                <div className="days-grid">
                  {days.map((day) => (
                    <button
                      key={day.id}
                      className={`day-button ${selectedDays.includes(day.id) ? 'selected' : ''}`}
                      onClick={() => handleDayToggle(day.id)}
                    >
                      {day.label}
                    </button>
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
                        <input
                          type="time"
                          className="time-input"
                          value={slot.startTime}
                          onChange={(e) => handleTimeSlotChange(slot.id, 'startTime', e.target.value)}
                        />
                        <span className="time-suffix">น.</span>
                      </div>
                      <div className="time-cell">
                        <input
                          type="time"
                          className="time-input"
                          value={slot.endTime}
                          onChange={(e) => handleTimeSlotChange(slot.id, 'endTime', e.target.value)}
                        />
                        <span className="time-suffix">น.</span>
                      </div>
                      <div className="bookings-cell">
                        <input
                          type="number"
                          className="bookings-input"
                          value={slot.bookings}
                          onChange={(e) => handleTimeSlotChange(slot.id, 'bookings', e.target.value)}
                          min="0"
                        />
                      </div>
                      <div className="delete-cell">
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteTimeSlot(slot.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="add-time-button" onClick={handleAddTimeSlot}>
                  + เพิ่มช่วงเวลา
                </button>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="cancel-button" onClick={handleCancel}>
                  ยกเลิก
                </button>
                <button className="save-button" onClick={handleSave}>
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
