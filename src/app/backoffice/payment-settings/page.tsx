'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useApi, apiRequest } from '@/hooks/useApi';
import './payment-settings.css';

export default function PaymentSettingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountName: '',
    bankName: '',
    accountNumber: ''
  });
  const [businessId, setBusinessId] = useState<string | null>(null);

  // Get business ID from URL or session
  useEffect(() => {
    if (session?.user?.id) {
      // For now, we'll use a default business ID
      // In a real app, you'd get this from the URL or user selection
      setBusinessId('default-business-id');
    }
  }, [session]);

  // Load bank accounts
  const { data: bankAccountsData, loading, error } = useApi(
    businessId ? `/api/bank-accounts?businessId=${businessId}` : null
  );

  useEffect(() => {
    if (bankAccountsData) {
      setBankAccounts(bankAccountsData);
    }
  }, [bankAccountsData]);

  const handleAddBankAccount = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      accountName: '',
      bankName: '',
      accountNumber: ''
    });
  };

  const handleSaveAccount = async () => {
    try {
      console.log('บันทึกบัญชี:', formData);
      
      const response = await apiRequest('/api/bank-accounts', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          businessId: businessId
        })
      });

      // Refresh bank accounts list
      const updatedAccounts = await apiRequest(`/api/bank-accounts?businessId=${businessId}`);
      setBankAccounts(updatedAccounts);
      
      handleCloseModal();
      
      // ไปหน้า Transfer Information
      setTimeout(() => {
        window.location.href = '/backoffice/transfer-info';
      }, 1000);
    } catch (error) {
      console.error('Error saving bank account:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกบัญชี');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditAccount = async (id: string) => {
    try {
      console.log('แก้ไขบัญชี:', id);
      // Find the account to edit
      const account = bankAccounts.find((acc: any) => acc.id === id);
      if (account) {
        setFormData({
          accountName: account.accountName,
          bankName: account.bankName,
          accountNumber: account.accountNumber
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error editing account:', error);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      if (confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชีนี้?')) {
        await apiRequest(`/api/bank-accounts/${id}`, {
          method: 'DELETE'
        });
        
        // Refresh bank accounts list
        const updatedAccounts = await apiRequest(`/api/bank-accounts?businessId=${businessId}`);
        setBankAccounts(updatedAccounts);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('เกิดข้อผิดพลาดในการลบบัญชี');
    }
  };

  return (
    <div className="payment-settings-container">
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
          <Link href="/backoffice/payment-settings" className="nav-item active">ชำระเงิน</Link>
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
            <h1 className="page-title">ตั้งค่าการชำระเงิน</h1>
            <button className="add-bank-button" onClick={handleAddBankAccount}>
              + เพิ่มบัญชีธนาคาร
            </button>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Bank Accounts Table */}
          <div className="bank-accounts-section">
            <div className="table-header">
              <div className="header-cell">ชื่อบัญชี</div>
              <div className="header-cell">ชื่อธนาคาร</div>
              <div className="header-cell">หมายเลขบัญชีธนาคาร</div>
            </div>
            
            <div className="table-divider"></div>
            
            {bankAccounts.length === 0 ? (
              <div className="empty-state">
                <p>ยังไม่มีบัญชีธนาคาร</p>
              </div>
            ) : (
              <div className="table-body">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="table-row">
                    <div className="table-cell">{account.accountName}</div>
                    <div className="table-cell">{account.bankName}</div>
                    <div className="table-cell">{account.accountNumber}</div>
                    <div className="table-cell actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditAccount(account.id)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-content">
          <span className="copyright">Copyright © PrettyQueue</span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">ช่องทางการโอนเงิน</h2>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">ชื่อบัญชี</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange('accountName', e.target.value)}
                  placeholder="กรอกชื่อบัญชี"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">ชื่อธนาคาร</label>
                <select
                  className="form-select"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                >
                  <option value="">เลือกธนาคาร</option>
                  <option value="กสิกรไทย">กสิกรไทย</option>
                  <option value="ไทยพาณิชย์">ไทยพาณิชย์</option>
                  <option value="กรุงเทพ">กรุงเทพ</option>
                  <option value="กรุงไทย">กรุงไทย</option>
                  <option value="ทหารไทยธนชาต">ทหารไทยธนชาต</option>
                  <option value="กรุงศรีอยุธยา">กรุงศรีอยุธยา</option>
                  <option value="ออมสิน">ออมสิน</option>
                  <option value="ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร">ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร</option>
                  <option value="ธนาคารอิสลามแห่งประเทศไทย">ธนาคารอิสลามแห่งประเทศไทย</option>
                  <option value="ธนาคารอาคารสงเคราะห์">ธนาคารอาคารสงเคราะห์</option>
                  <option value="ธนาคารทิสโก้">ธนาคารทิสโก้</option>
                  <option value="ธนาคารซิตี้แบงก์">ธนาคารซิตี้แบงก์</option>
                  <option value="ธนาคารสแตนดาร์ดชาร์เตอร์ด">ธนาคารสแตนดาร์ดชาร์เตอร์ด</option>
                  <option value="ธนาคารซูมิโตโม มิตซุย ทรัสต์">ธนาคารซูมิโตโม มิตซุย ทรัสต์</option>
                  <option value="ธนาคารมิซูโฮ">ธนาคารมิซูโฮ</option>
                  <option value="ธนาคารบีเอ็นพี ปารีบาส">ธนาคารบีเอ็นพี ปารีบาส</option>
                  <option value="ธนาคารเดอutsche Bank">ธนาคารเดอutsche Bank</option>
                  <option value="ธนาคารฮ่องกงและเซี่ยงไฮ้">ธนาคารฮ่องกงและเซี่ยงไฮ้</option>
                  <option value="ธนาคารไอซีบีซี">ธนาคารไอซีบีซี</option>
                  <option value="ธนาคารยูโอบี">ธนาคารยูโอบี</option>
                  <option value="ธนาคารเมย์แบงก์">ธนาคารเมย์แบงก์</option>
                  <option value="ธนาคารอินเดียนโอเวอร์ซี">ธนาคารอินเดียนโอเวอร์ซี</option>
                  <option value="ธนาคารไชน่า">ธนาคารไชน่า</option>
                  <option value="ธนาคารไชน่าเมอร์แคนไทล์">ธนาคารไชน่าเมอร์แคนไทล์</option>
                  <option value="ธนาคารไชน่าคอนสตรัคชั่น">ธนาคารไชน่าคอนสตรัคชั่น</option>
                  <option value="ธนาคารไชน่าเอเวอร์บรา이트">ธนาคารไชน่าเอเวอร์บรา이트</option>
                  <option value="ธนาคารไชน่าไอซีบีซี">ธนาคารไชน่าไอซีบีซี</option>
                  <option value="ธนาคารไชน่าซิตี้">ธนาคารไชน่าซิตี้</option>
                  <option value="ธนาคารไชน่าอินดัสเทรียล">ธนาคารไชน่าอินดัสเทรียล</option>
                  <option value="ธนาคารไชน่าบีโอซี">ธนาคารไชน่าบีโอซี</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">หมายเลขบัญชีธนาคาร</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="กรอกหมายเลขบัญชี"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseModal}>
                ยกเลิก
              </button>
              <button className="save-button" onClick={handleSaveAccount}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}