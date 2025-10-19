'use client';

import { useState } from 'react';
import Link from 'next/link';
import './dashboard.css';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBusiness = () => {
    setIsLoading(true);
    // Navigate to add business page
    window.location.href = '/backoffice/add-business';
  };

  return (
    <div className="dashboard-page">
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

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          <h2 className="main-heading">เริ่มต้นการใช้งาน PrettyQueue</h2>
          
          <div className="add-business-section">
            <div className="add-business-box" onClick={handleAddBusiness}>
              <div className="plus-icon">+</div>
            </div>
            <p className="add-business-text">เพิ่มธุรกิจ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
