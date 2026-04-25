"use client";

import { useState, useEffect } from "react";
import { mailService } from "@/services/mail.service";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/loading-spinner";
import { toast } from "sonner";

export default function MailSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    mail_mailer: "",
    mail_host: "",
    mail_port: "",
    mail_username: "",
    mail_password: "",
    mail_encryption: "",
    mail_from_address: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await mailService.getMailSettings(token);
      
      if (result.success && result.data) {
        setFormData({
          mail_mailer: result.data.mail_mailer || "",
          mail_host: result.data.mail_host || "",
          mail_port: result.data.mail_port || "",
          mail_username: result.data.mail_username || "",
          mail_password: result.data.mail_password || "",
          mail_encryption: result.data.mail_encryption || "",
          mail_from_address: result.data.mail_from_address || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch mail settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const result = await mailService.updateMailSettings(formData, token);
      
      if (result.success) {
        toast.success(result.message || 'Mail settings updated successfully');
      } else {
        toast.error('Failed to update mail settings: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to update mail settings:', error);
      toast.error('Failed to update mail settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageLoader message="Loading mail settings..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px', margin: 0 }}>
          Mail Settings
        </h1>
        <p style={{ fontSize: '16px', color: '#666666', margin: 0 }}>
          Configure SMTP and mail delivery settings
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 600px), 1fr))',
        gap: '24px',
        alignItems: 'flex-start',
      }}>
        {/* Settings Form */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
          {saving && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.7)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px'
            }}>
              <span style={{ fontWeight: 'bold', color: '#301960' }}>Saving...</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Mailer */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
                Mail Mailer (e.g., smtp)
              </label>
              <input
                type="text"
                name="mail_mailer"
                value={formData.mail_mailer}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* Host */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
                Mail Host
              </label>
              <input
                type="text"
                name="mail_host"
                value={formData.mail_host}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* Port */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
                Mail Port
              </label>
              <input
                type="text"
                name="mail_port"
                value={formData.mail_port}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* Username */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
                Mail Username
              </label>
              <input
                type="text"
                name="mail_username"
                value={formData.mail_username}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
                Mail Password
              </label>
              <input
                type="password"
                name="mail_password"
                value={formData.mail_password}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* Encryption */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
                Mail Encryption (e.g., tls)
              </label>
              <input
                type="text"
                name="mail_encryption"
                value={formData.mail_encryption}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none' }}
              />
            </div>

            {/* From Address */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block' }}>
                Mail From Address
              </label>
              <input
                type="text"
                name="mail_from_address"
                value={formData.mail_from_address}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none' }}
              />
            </div>

          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#301960',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              marginTop: '24px'
            }}
          >
            <Save size={16} />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
