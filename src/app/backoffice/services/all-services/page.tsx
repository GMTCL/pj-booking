'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './all-services.css';

export default function AllServicesPage() {
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'ต่อขนตา', 
      isActive: true, 
      imageUrl: '/images/eyelash-service.png' 
    }
  ]);

  const handleToggleService = (id: number) => {
    setServices(prev => prev.map(service =>
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const handleEditService = (id: number) => {
    console.log('Editing service:', id);
    // Handle edit logic here
  };

  const handleDeleteService = (id: number) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const handleAddService = () => {
    console.log('Adding new service...');
    // Handle add service logic here
  };

  const handleAddSubService = () => {
    console.log('Adding sub-service...');
    // Handle add sub-service logic here
  };

  const handleSaveAndContinue = () => {
    console.log('Saving and continuing...');
    console.log('Navigating to payment settings...');
    // Navigate to payment settings page
    setTimeout(() => {
      window.location.href = '/backoffice/payment-settings';
    }, 100);
  };

  return (
    <div className="all-services-page">
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
          
          {/* All Services Section */}
          <div className="services-section">
            <div className="section-header">
              <h2 className="section-title">ตั้งค่าบริการทั้งหมด (1/2)</h2>
              <button className="add-button" onClick={handleAddService}>
                + เพิ่ม
              </button>
            </div>

            <div className="services-list">
              {services.map((service) => (
                <div key={service.id} className="service-item">
                  <div className="service-image">
                    <Image 
                      src={service.imageUrl} 
                      alt={service.name}
                      width={200}
                      height={150}
                      className="service-img"
                    />
                  </div>
                  
                  <div className="service-controls">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={service.isActive}
                        onChange={() => handleToggleService(service.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                    
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditService(service.id)}
                    >
                      ✏️
                    </button>
                  </div>
                  
                  <div className="service-name">
                    {service.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="footer-buttons">
            <button className="add-subservice-button" onClick={handleAddSubService}>
              เพิ่มบริการย่อย
            </button>
            <button className="save-button" onClick={handleSaveAndContinue}>
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
