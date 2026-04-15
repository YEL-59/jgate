"use client";

import { useState, useEffect } from "react";
import { Save, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getContactUsData, updateContactUsData } from "@/services/dashboard/contact-us";

export function ContactUsEditor() {
    const [formData, setFormData] = useState({ email: '', phone: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await getContactUsData(token);
        if (res?.success && res?.data) {
            setFormData({
                email: res.data.email || '',
                phone: res.data.phone || ''
            });
            if (res.data.updated_at) {
                setLastUpdated(res.data.updated_at);
            }
        } else {
            toast.error(res?.message || "Failed to fetch contact details");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem("token");
        
        const res = await updateContactUsData(token, formData);

        if (res?.success) {
            toast.success(res.message || "Contact details saved successfully!");
            if (res.data?.updated_at) {
                setLastUpdated(res.data.updated_at);
            }
        } else {
            toast.error(res?.message || "Failed to save contact details");
        }
        setSaving(false);
    };

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', margin: '0 0 24px 0' }}>
                Contact Us Details
            </h2>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading contact details...</div>
            ) : (
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                            Email Address
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#6b7280' }}>
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="support@example.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '15px',
                                    outline: 'none',
                                    color: '#1a1a1a'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                            Phone Number
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#6b7280' }}>
                                <Phone size={18} />
                            </div>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                placeholder="+1 (800) 123-4567"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '15px',
                                    outline: 'none',
                                    color: '#1a1a1a'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                        {lastUpdated ? (
                            <div style={{ fontSize: '13px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Clock size={14} /> Last updated: {new Date(lastUpdated).toLocaleString()}
                            </div>
                        ) : (
                            <div />
                        )}
                        <Button
                            type="submit"
                            disabled={saving}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: saving ? '#9CA3AF' : '#301960',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: saving ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Save size={16} />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
