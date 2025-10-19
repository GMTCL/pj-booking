'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useNotification } from '@/hooks/useNotification';
import NotificationContainer from '@/components/NotificationContainer';

export default function HomePage() {
  const router = useRouter();
  const { notifications, showNotification, removeNotification } = useNotification();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    // Show welcome notification
    setTimeout(() => {
      showNotification('ยินดีต้อนรับสู่ PrettyQueue Studio!', 'info');
    }, 1000);
  }, [showNotification]);

  const handleServiceSelection = (serviceType: string, serviceName: string) => {
    setSelectedService(serviceType);
    showNotification(`เลือกบริการ: ${serviceName}`, 'success');
    
    setTimeout(() => {
      if (serviceType === 'manicure') {
        router.push('/booking');
      } else if (serviceType === 'eyelash') {
        router.push('/eyelash-booking');
      }
    }, 500);
  };

  return (
    <div className="mobile-app">
      {/* Main Container */}
      <div className="app-container">
        {/* Background Image Section */}
        <div className="background-section">
          <div className="eye-image"></div>
        </div>
        
        {/* Main Content Card */}
        <div className="main-card">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-circle">
              <Image 
                src="/images/Group 55.png" 
                alt="Logo" 
                width={120} 
                height={120}
                className="logo-image"
              />
            </div>
          </div>
          
          {/* Title Section */}
          <div className="title-section">
            <h1 className="main-title">นัดหมายเสริมสวย</h1>
            <p className="studio-name">PrettyQueue Studio</p>
          </div>
          
          {/* Service Categories Section */}
          <div className="service-section">
            <h3 className="service-label">ประเภทบริการ</h3>
            
            <div className="service-cards">
              {/* Manicure Service - First icon at left: 24px */}
              <div className={`service-item ${selectedService === 'manicure' ? 'selected' : ''}`} onClick={() => handleServiceSelection('manicure', 'ทำเล็บ')}>
                <div className={`service-card manicure-card ${selectedService === 'manicure' ? 'selected' : ''}`}>
                  <div className="service-icon">
                    <Image 
                      src="/images/Screenshot 2568-10-17 at 22.09.21-Photoroom.png" 
                      alt="Manicure Icon" 
                      width={78} 
                      height={78}
                      className="manicure-icon"
                    />
                  </div>
                </div>
                <span className={`service-name manicure-name ${selectedService === 'manicure' ? 'selected' : ''}`}>ทำเล็บ</span>
              </div>
              
              {/* Eyelash Service - Second icon at left: 125px */}
              <div className={`service-item ${selectedService === 'eyelash' ? 'selected' : ''}`} onClick={() => handleServiceSelection('eyelash', 'ต่อขนตา')}>
                <div className={`service-card eyelash-card ${selectedService === 'eyelash' ? 'selected' : ''}`}>
                  <div className="service-icon">
                    <Image 
                      src="/images/ขนตา_preview_rev_1 1.png" 
                      alt="Eyelash Icon" 
                      width={78} 
                      height={78}
                      className="eyelash-icon"
                    />
                  </div>
                </div>
                <span className={`service-name eyelash-name ${selectedService === 'eyelash' ? 'selected' : ''}`}>ต่อขนตา</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Notifications */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </div>
  );
}