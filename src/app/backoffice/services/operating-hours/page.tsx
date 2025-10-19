'use client';

import { useState } from 'react';
import Link from 'next/link';
import './operating-hours.css';

export default function OperatingHoursPage() {
  const [operatingHours, setOperatingHours] = useState({
    monday: { enabled: false, startTime: '00:00', endTime: '00:00' },
    tuesday: { enabled: false, startTime: '00:00', endTime: '00:00' },
    wednesday: { enabled: false, startTime: '00:00', endTime: '00:00' },
    thursday: { enabled: false, startTime: '00:00', endTime: '00:00' },
    friday: { enabled: false, startTime: '00:00', endTime: '00:00' },
    saturday: { enabled: false, startTime: '00:00', endTime: '00:00' },
    sunday: { enabled: false, startTime: '00:00', endTime: '00:00' }
  });

  const [timePerRound, setTimePerRound] = useState('');
  const [bookableSlots, setBookableSlots] = useState('');

  const days = [
    { key: 'monday', label: 'จันทร์' },
    { key: 'tuesday', label: 'อังคาร' },
    { key: 'wednesday', label: 'พุธ' },
    { key: 'thursday', label: 'พฤหัสบดี' },
    { key: 'friday', label: 'ศุกร์' },
    { key: 'saturday', label: 'เสาร์' },
    { key: 'sunday', label: 'อาทิตย์' }
  ];

  const handleDayToggle = (dayKey: string) => {
    setOperatingHours(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        enabled: !prev[dayKey].enabled
      }
    }));
  };

  const handleTimeChange = (dayKey: string, timeType: 'startTime' | 'endTime', value: string) => {
    setOperatingHours(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [timeType]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving operating hours...', operatingHours);
    console.log('Time per round:', timePerRound);
    console.log('Bookable slots:', bookableSlots);
    // Navigate to summary page
    window.location.href = '/backoffice/services/summary';
  };

  const handleCancel = () => {
    console.log('Cancelling...');
    // Handle cancel logic here
  };

  return (
    <div className="operating-hours-page">
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
          
          {/* Operating Hours Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่าข้อมูลวัน - เวลาทำการ</h2>
            </div>
            
            <div className="description">
              หากเคยตั้งค้าไว้แล้วข้อมูลทั้งหมดจะถูกตั้งค่าใหม่
            </div>

            <div className="operating-hours-table">
              <div className="table-header">
                <div className="header-cell">วัน</div>
                <div className="header-cell">เวลา</div>
                <div className="header-cell">เวลาสิ้นสุด</div>
              </div>

              {days.map((day) => (
                <div key={day.key} className="table-row">
                  <div className="day-cell">
                    <input
                      type="checkbox"
                      className="day-checkbox"
                      checked={operatingHours[day.key].enabled}
                      onChange={() => handleDayToggle(day.key)}
                    />
                    <span className="day-label">{day.label}</span>
                  </div>
                  <div className="time-cell">
                    <input
                      type="time"
                      className="time-input"
                      value={operatingHours[day.key].startTime}
                      onChange={(e) => handleTimeChange(day.key, 'startTime', e.target.value)}
                      disabled={!operatingHours[day.key].enabled}
                    />
                    <span className="time-suffix">น.</span>
                  </div>
                  <div className="time-cell">
                    <input
                      type="time"
                      className="time-input"
                      value={operatingHours[day.key].endTime}
                      onChange={(e) => handleTimeChange(day.key, 'endTime', e.target.value)}
                      disabled={!operatingHours[day.key].enabled}
                    />
                    <span className="time-suffix">น.</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Settings Section */}
          <div className="settings-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่ารอบการจอง</h2>
            </div>

            <div className="booking-settings">
              <div className="form-field">
                <label className="field-label">ตั้งค่าเวลาต่อรอบ</label>
                <input
                  type="text"
                  className="form-input"
                  value={timePerRound}
                  onChange={(e) => setTimePerRound(e.target.value)}
                  placeholder="กรอกเวลาต่อรอบ"
                />
              </div>

              <div className="form-field">
                <label className="field-label">จำนวนที่สามารถจองได้/รอบ</label>
                <input
                  type="text"
                  className="form-input"
                  value={bookableSlots}
                  onChange={(e) => setBookableSlots(e.target.value)}
                  placeholder="กรอกจำนวนที่สามารถจองได้"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="settings-section">
            <div className="action-buttons">
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

      {/* Footer */}
      <div className="footer">
        <div className="footer-content">
          <span className="copyright">Copyright © PrettyQueue</span>
        </div>
      </div>
    </div>
  );
}
