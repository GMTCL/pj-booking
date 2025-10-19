'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import './backoffice.css';

export default function BackofficeLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        alert('เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล');
      } else {
        router.push('/backoffice/main-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: '/backoffice/main-dashboard' });
    } catch (error) {
      console.error('Social login error:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div className="backoffice-login">
      <div className="login-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-circle">
            <img 
              src="/images/Group 55.png" 
              alt="PQ Logo" 
              className="logo-image"
            />
          </div>
          <h1 className="brand-title">Promotion</h1>
          <p className="brand-subtitle">PrettyQueue Studio</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

          <a href="#" className="forgot-password">
            ลืมรหัสผ่าน ?
          </a>
        </form>

        {/* Social Login */}
        <div className="social-login">
          <div className="divider">
            <span>หรือเข้าสู่ระบบผ่าน</span>
          </div>

          <div className="social-buttons">
            <button 
              className="social-button facebook"
              onClick={() => handleSocialLogin('facebook')}
            >
              <img src="/images/facebook-logo.png" alt="Facebook" className="social-icon facebook-icon" />
              <span>Facebook</span>
            </button>

            <div className="social-divider"></div>

            <button 
              className="social-button line"
              onClick={() => handleSocialLogin('line')}
            >
              <img src="/images/line-logo.png" alt="Line" className="social-icon line-icon" />
              <span>Line</span>
            </button>
          </div>
        </div>

        {/* Registration Link */}
        <div className="registration-link">
          <span>หากยังไม่มีบัญชี</span>
          <a href="#" className="register-link">
            คลิกที่นี่เพื่อลงทะเบียน
          </a>
        </div>
      </div>
    </div>
  );
}
