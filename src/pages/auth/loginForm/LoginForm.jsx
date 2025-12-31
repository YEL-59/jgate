"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { theme } from "@/config/theme.config";
import { useLogin } from "@/services/auth/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
     const payload={
      email,
      password
     }
      const res = await useLogin(payload);
      console.log(res)
     
      
     
      
      // Redirect to dashboard
   if(res.success){
      localStorage.setItem("token", res?.data?.token)
            localStorage.setItem("user", JSON.stringify(res?.data?.user))
    toast.success(res.message)
    router.push('/dashboard');
   }else{
    toast.error(res.message)
   }
   
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F0F2F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* Logo and Branding */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: theme.colors.sidebar.active,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.sidebar.background,
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            {theme.brand.logo}
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #301960 0%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            {theme.brand.name}
          </h1>
        </div>

        {/* Admin Login Heading */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1a1a1a',
          textAlign: 'center',
          marginBottom: '32px',
          margin: '0 0 32px 0',
        }}>
          Admin Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '8px',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              disabled={loading}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#F9FAFB',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#301960';
                e.currentTarget.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '8px',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#F9FAFB',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#301960';
                e.currentTarget.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: loading ? '#9CA3AF' : '#301960',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#1a1140';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#301960';
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

