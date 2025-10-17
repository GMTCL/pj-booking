'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useNotification } from '@/hooks/useNotification';
import NotificationContainer from '@/components/NotificationContainer';
import './booking.css';

export default function BookingPage() {
  const router = useRouter();
  const { notifications, showNotification, removeNotification } = useNotification();
  
  const [selectedTechnician, setSelectedTechnician] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2025);

  const handleTechnicianSelect = (technicianId: string) => {
    setSelectedTechnician(technicianId);
    showNotification(`เลือกช่าง: ธีรดา`, 'success');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    showNotification(`เลือกเวลา: ${time}`, 'success');
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
    showNotification(`เลือกวันที่: ${date}`, 'success');
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

  const handleNext = () => {
    if (!selectedTechnician || !selectedTime || !selectedDate) {
      showNotification('กรุณาเลือกข้อมูลให้ครบถ้วน', 'error');
      return;
    }
    showNotification('ไปขั้นตอนถัดไป: ประวัติส่วนตัว', 'success');
    router.push('/personal-info');
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

  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  return (
    <div className="booking-page">
      {/* Header */}
      <div className="booking-header">
        <button 
          className="close-button"
          onClick={() => router.push('/')}
        >
          ✕
        </button>
        <h1 className="booking-title">จองคิวทำเล็บ</h1>
        <p className="studio-name">PrettyQueue Studio</p>
      </div>

      {/* Progress Tracker */}
      <div className="progress-tracker">
        <div className="progress-step active">
          <span className="step-text">เลือกวัน / เวลา</span>
          <div className="step-circle active"></div>
        </div>
        <div className="progress-step">
          <span className="step-text">ประวัติส่วนตัว</span>
          <div className="step-circle"></div>
        </div>
        <div className="progress-step">
          <span className="step-text">ชำระเงิน</span>
          <div className="step-circle"></div>
        </div>
        <div className="progress-line step-1"></div>
      </div>

      {/* Select Technician Section */}
      <div className="section">
        <h3 className="section-title">เลือกช่าง</h3>
        <div className="technician-grid">
          {[
            { name: 'ธีรดา', avatar: '/รูปช่างต้นแบบ/Rectangle 308.png', id: 'stylist-1' },
            { name: 'ธีรดา', avatar: '/รูปช่างต้นแบบ/Rectangle 310.png', id: 'stylist-2' },
            { name: 'ธีรดา', avatar: '/รูปช่างต้นแบบ/Rectangle 312.png', id: 'stylist-3' },
            { name: 'ธีรดา', avatar: '/รูปช่างต้นแบบ/Rectangle 314.png', id: 'stylist-4' }
          ].map((stylist, index) => (
            <button
              key={`technician-${index}`}
              className={`technician-card ${selectedTechnician === stylist.id ? 'selected' : ''}`}
              onClick={() => handleTechnicianSelect(stylist.id)}
            >
              <div className="technician-avatar">
                <img 
                  src={stylist.avatar} 
                  alt={stylist.name}
                  className="avatar-image"
                />
              </div>
              <span className="technician-name">{stylist.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Select Time Section */}
      <div className="section">
        <h3 className="section-title">เลือกเวลา</h3>
        <div className="time-grid">
          {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((time) => (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
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


      {/* Next Button */}
      <div className="next-button-container">
        <button 
          className="next-button" 
          onClick={handleNext}
          disabled={!selectedTechnician || !selectedTime || !selectedDate}
        >
          {!selectedTechnician || !selectedTime || !selectedDate 
            ? 'เลือกช่างและเวลา' 
            : 'ต่อไป'}
        </button>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="calendar-modal">
          <div className="calendar-popup">
            <div className="calendar-header">
              <button className="calendar-nav" onClick={handlePrevMonth}>‹</button>
              <span className="calendar-month">{monthNames[currentMonth]} {currentYear}</span>
              <button className="calendar-nav" onClick={handleNextMonth}>›</button>
            </div>
            
            <div className="calendar-weekdays">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            
            <div className="calendar-days">
              {generateCalendar().map((day, index) => (
                <button
                  key={`calendar-day-${index}`}
                  className={`calendar-day ${selectedDate === day?.toString() ? 'selected' : ''} ${!day ? 'empty' : ''}`}
                  onClick={() => day && handleDateSelect(day.toString())}
                  disabled={!day}
                >
                  {day}
                </button>
              ))}
            </div>
            
            <div className="calendar-actions">
              <button 
                className="calendar-cancel"
                onClick={handleCalendarCancel}
              >
                ยกเลิก
              </button>
              <button 
                className="calendar-confirm"
                onClick={handleCalendarConfirm}
              >
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