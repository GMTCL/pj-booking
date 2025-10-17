'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/hooks/useNotification';
import NotificationContainer from '@/components/NotificationContainer';
import './eyelash-personal-info.css';

export default function EyelashPersonalInfoPage() {
  const router = useRouter();
  const { notifications, showNotification, removeNotification } = useNotification();
  
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2025/03/05');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2025);

  const handleNext = () => {
    if (!customerName || !customerPhone) {
      showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
      return;
    }
    showNotification('ไปขั้นตอนถัดไป: ชำระเงิน', 'success');
    router.push('/eyelash-payment');
  };

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    setShowCalendar(false);
    showNotification(`เลือกวันที่: ${formattedDate}`, 'success');
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleCalendarConfirm = () => {
    setShowCalendar(false);
  };

  const handleCalendarCancel = () => {
    setShowCalendar(false);
  };

  return (
    <div className="personal-info-page">
      {/* Header */}
      <div className="personal-info-header">
        <button 
          className="close-button"
          onClick={() => router.push('/')}
        >
          ✕
        </button>
        <h1 className="personal-info-title">จองคิวต่อขนตา</h1>
        <p className="studio-name">PrettyQueue Studio</p>
      </div>

      {/* Progress Tracker */}
      <div className="progress-tracker">
        <div className="progress-step completed">
          <span className="step-text">เลือกวัน / เวลา</span>
          <div className="step-circle completed"></div>
        </div>
        <div className="progress-step active">
          <span className="step-text">ประวัติส่วนตัว</span>
          <div className="step-circle active"></div>
        </div>
        <div className="progress-step">
          <span className="step-text">ชำระเงิน</span>
          <div className="step-circle"></div>
        </div>
        <div className="progress-line step-2"></div>
      </div>

      {/* Personal Information Section */}
      <div className="section">
        <h3 className="section-title">ประวัติส่วนตัว</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="field-label">ชื่อ*</label>
            <input
              type="text"
              className="form-input"
              placeholder="กรอกชื่อของคุณ"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="field-label">เบอร์โทร*</label>
            <input
              type="tel"
              className="form-input"
              placeholder="กรอกเบอร์โทรของคุณ"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Select Date Section */}
      <div className="section">
        <h3 className="section-title">เลือกวันที่</h3>
        <div className="date-input-container">
          <div className="date-input" onClick={() => setShowCalendar(true)}>
            <div className="calendar-icon">📅</div>
            <span className="date-placeholder">
              {selectedDate ? selectedDate : 'วันที่'}
            </span>
          </div>
        </div>
      </div>

      {/* Deposit Information Section */}
      <div className="section">
        <h3 className="section-title">ค่ามัดจำการจองคิว</h3>
        <div className="deposit-info">
          <p className="deposit-text">ชำระมัดจำ 500 บาท เพื่อจองคิวนี้</p>
          <p className="deposit-text">มัดจำสามารถหักจากค่าบริการเต็มเมื่อเข้ารับบริการ</p>
          <p className="deposit-text">[ช่องทางชำระเงิน: QR, PromptPay, บัตรเครดิต ฯลฯ]</p>
          <p className="deposit-warning">*หากลูกค้าชำระค่ามัดจำไปแลวไม่สามารถขอเงินมัดจำคืน ทุกกรณี*</p>
        </div>
      </div>

      {/* Next Button */}
      <div className="next-button-container">
        <button 
          className="next-button" 
          onClick={handleNext}
          disabled={!customerName || !customerPhone}
        >
          {!customerName || !customerPhone ? 'กรอกข้อมูลให้ครบถ้วน' : 'ถัดไป'}
        </button>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="calendar-modal">
          <div className="calendar-content">
            <div className="calendar-header">
              <button className="calendar-nav" onClick={handlePrevMonth}>‹</button>
              <h3 className="calendar-title">
                {new Date(currentYear, currentMonth).toLocaleDateString('th-TH', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </h3>
              <button className="calendar-nav" onClick={handleNextMonth}>›</button>
            </div>
            
            <div className="calendar-grid">
              <div className="calendar-day-header">อา</div>
              <div className="calendar-day-header">จ</div>
              <div className="calendar-day-header">อ</div>
              <div className="calendar-day-header">พ</div>
              <div className="calendar-day-header">พฤ</div>
              <div className="calendar-day-header">ศ</div>
              <div className="calendar-day-header">ส</div>
              
              {generateCalendar().map((day, index) => (
                <button
                  key={`calendar-day-${index}`}
                  className={`calendar-day ${day === null ? 'empty' : ''} ${selectedDate === day?.toString() ? 'selected' : ''}`}
                  onClick={() => day && handleDateSelect(day)}
                  disabled={day === null}
                >
                  {day}
                </button>
              ))}
            </div>
            
            <div className="calendar-actions">
              <button className="calendar-button cancel" onClick={handleCalendarCancel}>
                ยกเลิก
              </button>
              <button className="calendar-button confirm" onClick={handleCalendarConfirm}>
                ยืนยัน
              </button>
            </div>
          </div>
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
