"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { 
  Mail, 
  User, 
  BadgeCheck, 
  Clock, 
  X,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export function SubAdminDetailsModal({ subAdmin, open, onOpenChange }) {
  if (!subAdmin) return null;

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex-shrink-0 group-hover:scale-105 group-hover:border-indigo-200 transition-all duration-300">
        <Icon size={18} className="text-indigo-500 group-hover:text-indigo-600 transition-colors" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-semibold text-slate-800 truncate">{value || "N/A"}</span>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white rounded-3xl shadow-2xl overflow-hidden"
        showCloseButton={false}
      >
        {/* Header/Cover Area with Modern Deep Slate-Indigo Gradient and Soft Glow */}
        <div style={{ 
          height: '140px', 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', 
          position: 'relative'
        }}>
          {/* Neon Glowing Spheres in Background */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden', 
            pointerEvents: 'none' 
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '-50px', 
              right: '-50px', 
              width: '180px', 
              height: '180px', 
              borderRadius: '50%', 
              background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)', 
              filter: 'blur(15px)' 
            }} />
          </div>

          {/* Premium Glassmorphic Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-all p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-xs flex items-center justify-center z-20 shadow-md active:scale-95"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Overlapping Profile Info Container */}
          <div style={{ position: 'absolute', bottom: '-45px', left: '24px', display: 'flex', alignItems: 'flex-end', gap: '18px', zIndex: 10 }}>
            {/* Shield Icon Avatar Placeholder */}
            <div style={{ 
              width: '108px', 
              height: '108px', 
              borderRadius: '24px', 
              border: '4px solid white', 
              overflow: 'hidden', 
              backgroundColor: '#F8FAFC', 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-500">
                <ShieldCheck size={48} />
              </div>
            </div>

            {/* Profile Info Text & Badges */}
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ 
                fontSize: '26px', 
                fontWeight: '800', 
                color: '#ffffff', 
                margin: 0, 
                letterSpacing: '-0.02em', 
                textShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}>
                {subAdmin.name}
              </h2>
              
              <div className="flex items-center gap-2 mt-2">
                {/* Role Badges */}
                {subAdmin.roles && subAdmin.roles.map((role, idx) => (
                  <span key={role.id || role.name || idx} className="px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide border border-indigo-200 bg-indigo-50/95 text-indigo-700 shadow-sm backdrop-blur-xs capitalize">
                    {role.name || role}
                  </span>
                ))}

                {/* Status Badge */}
                {subAdmin.status && (
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide border flex items-center gap-1.5 shadow-sm backdrop-blur-xs transition-all duration-300 ${
                    subAdmin.status === 'Active' 
                      ? 'border-emerald-200 bg-emerald-50/95 text-emerald-700' 
                      : 'border-rose-200 bg-rose-50/95 text-rose-700'
                  }`}>
                    {subAdmin.status === 'Active' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                    {subAdmin.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Main Content */}
        <div style={{ padding: '65px 24px 24px 24px' }}>
          {/* Responsively Grid Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem icon={Mail} label="Email Address" value={subAdmin.email} />
            <DetailItem icon={BadgeCheck} label="Account ID" value={`ID: ${subAdmin.id}`} />
            <DetailItem icon={Clock} label="Joined Date" value={subAdmin.created_at} />
            <DetailItem icon={Clock} label="Last Updated" value={subAdmin.updated_at} />
          </div>

          {/* Permissions List Section */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <ShieldAlert size={16} className="text-indigo-500" /> Account Permissions
            </h3>
            
            {subAdmin.permissions && subAdmin.permissions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subAdmin.permissions.map((perm, idx) => (
                  <div 
                    key={perm.id || perm.permission || idx} 
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/5 transition-all duration-200"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">
                      {perm.permission || perm.name || perm}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-400">
                No permissions assigned
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
