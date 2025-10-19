'use client';

import { useState } from 'react';
import Link from 'next/link';
import './main-dashboard.css';

export default function MainDashboardPage() {
  const [loginType, setLoginType] = useState('general');

  const handleLoginTypeChange = (type: string) => {
    setLoginType(type);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="main-dashboard-page">
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
            <Link href="/backoffice/main-dashboard" className="nav-item active">หน้าหลัก</Link>
            <Link href="/backoffice/shop" className="nav-item">ร้านค้า</Link>
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
          <div className="salon-info">
            <div className="salon-left">
              <div className="salon-image">
                <img src="/images/salon-image.jpg" alt="Salon" className="salon-img" />
              </div>
              
              <div className="links-section">
                <div className="link-item">
                  <span className="link-label">เว็บไซต์</span>
                  <div className="link-content">
                    <span className="link-url">https://page.line.me/357xqvdm</span>
                    <div className="link-actions">
                      <button 
                        className="action-btn copy-btn"
                        onClick={() => copyToClipboard('https://page.line.me/357xqvdm')}
                        title="Copy"
                      >
                        <img src="/images/copy-icon.png" alt="Copy" className="action-icon" />
                      </button>
                      <button 
                        className="action-btn open-btn"
                        onClick={() => openInNewTab('https://page.line.me/357xqvdm')}
                        title="Open in new tab"
                      >
                        <img src="/images/share-icon.png" alt="Share" className="action-icon" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="link-item">
                  <span className="link-label">Line OA</span>
                  <div className="link-content">
                    <span className="link-url">https://page.line.me/357xqvdm</span>
                    <div className="link-actions">
                      <button 
                        className="action-btn copy-btn"
                        onClick={() => copyToClipboard('https://page.line.me/357xqvdm')}
                        title="Copy"
                      >
                        <img src="/images/copy-icon.png" alt="Copy" className="action-icon" />
                      </button>
                      <button 
                        className="action-btn open-btn"
                        onClick={() => openInNewTab('https://page.line.me/357xqvdm')}
                        title="Open in new tab"
                      >
                        <img src="/images/share-icon.png" alt="Share" className="action-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="salon-details">
              <h2 className="salon-name">Salon Gold สาขา 1</h2>
              
              <div className="login-options">
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="loginType"
                      value="social"
                      checked={loginType === 'social'}
                      onChange={() => handleLoginTypeChange('social')}
                      className="radio-input"
                    />
                    <span className="radio-label">เริ่มต้นด้วยการล็อกอิน FB / Line</span>
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="loginType"
                      value="general"
                      checked={loginType === 'general'}
                      onChange={() => handleLoginTypeChange('general')}
                      className="radio-input"
                    />
                    <span className="radio-label">เริ่มต้นด้วยผู้ใช้งานทั่วไป</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
