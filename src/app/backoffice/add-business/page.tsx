'use client';

import { useState } from 'react';
import Link from 'next/link';
import './add-business.css';

export default function AddBusinessPage() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const businessTypes = [
    'ร้านทำเล็บ',
    'ร้านทำผม',
    'ร้านนวด',
    'ร้านเสริมสวย',
    'ร้านอื่นๆ'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Handle form submission here
    console.log('Business Name:', businessName);
    console.log('Business Type:', businessType);
    console.log('Image:', selectedImage);
    
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to main dashboard
      window.location.href = '/backoffice/main-dashboard';
    }, 1000);
  };

  const handleCancel = () => {
    // Navigate back to dashboard
    window.history.back();
  };

  return (
    <div className="add-business-page">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <Link href="/backoffice/dashboard" className="home-link">Home</Link>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="profile-icon">👤</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-box">
          <div className="content-header">
            <h1 className="page-title">ธุรกิจ</h1>
            <p className="page-subtitle">กรุณาระบุรายละเอียดของธุรกิจ</p>
          </div>

          <form onSubmit={handleSubmit} className="business-form">
            {/* Image Upload */}
            <div className="image-upload-section">
              <div className="image-upload-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Business preview" className="uploaded-image" />
                ) : (
                  <div className="upload-placeholder">
                    <div className="camera-icon">📷</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="upload-label">
                      เพิ่มรูปภาพ
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Business Name Input */}
            <div className="input-group">
              <label htmlFor="business-name" className="input-label">ชื่อธุรกิจ</label>
              <input
                type="text"
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="text-input"
                placeholder="กรุณาใส่ชื่อธุรกิจ"
                required
              />
            </div>

            {/* Business Type Dropdown */}
            <div className="input-group">
              <label htmlFor="business-type" className="input-label">ประเภทธุรกิจ</label>
              <div className="dropdown-container">
                <select
                  id="business-type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="dropdown-select"
                  required
                >
                  <option value="">เลือกประเภทธุรกิจ</option>
                  {businessTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                <div className="dropdown-arrow">▼</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="confirm-button"
                disabled={isLoading}
              >
                {isLoading ? 'กำลังบันทึก...' : 'ยืนยัน'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="copyright">Copyright © PrettyQueue</p>
      </div>
    </div>
  );
}
