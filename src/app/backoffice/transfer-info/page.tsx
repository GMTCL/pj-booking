'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useApi, apiRequest, uploadFile } from '@/hooks/useApi';
import './transfer-info.css';

export default function TransferInfoPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState('');
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Get business ID from URL or session
  useEffect(() => {
    if (session?.user?.id) {
      setBusinessId('default-business-id');
    }
  }, [session]);

  // Load existing transfer info
  const { data: transferInfo, loading } = useApi(
    businessId ? `/api/transfer-info?businessId=${businessId}` : null
  );

  useEffect(() => {
    if (transferInfo) {
      setMessage(transferInfo.message || '');
      setUploadedImage(transferInfo.image || null);
    }
  }, [transferInfo]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('businessId', businessId || '');
      formData.append('message', message);
      
      if (uploadedImage) {
        formData.append('image', uploadedImage);
      }

      await uploadFile('/api/transfer-info', formData);
      alert('บันทึกข้อมูลการโอนเงินเรียบร้อยแล้ว');
    } catch (error) {
      console.error('Error saving transfer info:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        console.log('อัพโหลดรูปภาพ:', file.name);
        // For now, we'll just store the file name
        // In a real app, you'd upload to a file storage service
        setUploadedImage(file.name);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ');
      }
    }
  };

  return (
    <div className="transfer-info-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">PrettyQueue</span>
          </div>
          <div className="user-profile">
            <div className="profile-icon">👤</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-container">
        <button className="nav-arrow left">‹</button>
        <div className="nav-items">
          <Link href="/backoffice/main-dashboard" className="nav-item">หน้าหลัก</Link>
          <Link href="/backoffice/payment-settings" className="nav-item">ชำระเงิน</Link>
          <Link href="/backoffice/services" className="nav-item">บริการ</Link>
          <Link href="/backoffice/technicians" className="nav-item">ช่างบริการ</Link>
          <Link href="/backoffice/customers" className="nav-item">ข้อมูลลูกค้า</Link>
          <Link href="/backoffice/queue-management" className="nav-item">จัดการคิว</Link>
        </div>
        <button className="nav-arrow right">›</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">ข้อมูลการโอนเงิน</h1>
            <button className="edit-button">
              <span className="edit-icon">✏️</span>
            </button>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Transfer Information Section */}
          <div className="transfer-section">
            {/* Image Upload */}
            <div className="image-upload-section">
              <div className="upload-box">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <label htmlFor="image-upload" className="upload-label">
                  <div className="upload-icon">📷</div>
                </label>
              </div>
              <div className="upload-info">
                <p className="upload-text">อัพโหลดไฟล์ขนาด : 10MB</p>
              </div>
            </div>

            {/* Message Input */}
            <div className="message-section">
              <textarea
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ข้อความ"
                rows={8}
              />
            </div>
          </div>

          {/* Action Buttons */}
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

      {/* Footer */}
      <div className="footer">
        <div className="footer-content">
          <span className="copyright">Copyright © PrettyQueue</span>
        </div>
      </div>
    </div>
  );
}
