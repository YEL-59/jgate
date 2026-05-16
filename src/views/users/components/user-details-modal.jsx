"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Calendar, MapPin, User, Briefcase, Info, BadgeCheck, Clock } from "lucide-react";

export function UserDetailsModal({ user, open, onOpenChange }) {
  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', flexShrink: 0 }}>
        <Icon size={18} color="#6366F1" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <span style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{value || "N/A"}</span>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white">
        {/* Header/Cover Area */}
        <div style={{ height: '120px', background: '#282870', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: '-40px', left: '24px', display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '20px', border: '4px solid white', overflow: 'hidden', backgroundColor: '#F3F4F6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              {user.profile_photo ? (
                <img src={user.profile_photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5E7EB' }}>
                  <User size={48} color="#9CA3AF" />
                </div>
              )}
            </div>
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fcfdffff', margin: 0 }}>{user.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', backgroundColor: '#EEF2FF', color: '#4F46E5' }}>
                  {user.current_mode || "User"}
                </span>
                {user.status && (
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: '500', 
                    backgroundColor: user.status === 'Active' ? '#D1FAE5' : '#FEE2E2', 
                    color: user.status === 'Active' ? '#065F46' : '#991B1B' 
                  }}>
                    {user.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '60px 24px 24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <DetailItem icon={Mail} label="Email Address" value={user.email} />
            <DetailItem icon={Phone} label="Contact Number" value={user.contact || user.phone} />
            <DetailItem icon={User} label="Gender" value={user.gender} />
            <DetailItem icon={Calendar} label="Date of Birth" value={formatDate(user.dob)} />
            <DetailItem icon={Briefcase} label="Experience Level" value={user.experience_level} />
            <DetailItem icon={BadgeCheck} label="Director Status" value={user.director_status} />
            <DetailItem icon={MapPin} label="Address" value={user.address} />
            <DetailItem icon={Clock} label="Joined Date" value={formatDate(user.created_at)} />
          </div>

          {user.bio && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={16} /> Bio
              </h3>
              <div style={{ padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px', fontSize: '14px', color: '#4B5563', lineHeight: '1.6' }}>
                {user.bio}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
