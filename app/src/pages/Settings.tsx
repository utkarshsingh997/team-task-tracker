import { useState } from 'react';
import { User, Key, Mail, LogOut, Save } from 'lucide-react';
import { AppLayout } from '@/components/custom/AppLayout';
import { Toast } from '@/components/custom/Toast';
import { useAuthContext } from '@/context/AuthContext';

export default function Settings() {
  const { user, updateProfile, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [fullName, setFullName] = useState(user?.name || '');
  const [toast, setToast] = useState('');

  const handleSave = () => {
    if (fullName.trim()) {
      updateProfile(fullName.trim());
      setToast('Profile updated successfully');
    }
  };

  const memberSince = user ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-1">Settings</h1>
        <p className="text-sm text-[#94A3B8] mb-6">Manage your account preferences</p>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`tab-pill text-sm flex items-center gap-2 ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`tab-pill text-sm flex items-center gap-2 ${activeTab === 'account' ? 'active' : ''}`}
          >
            <Key className="w-4 h-4" />
            Account
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && user && (
          <div className="card-surface p-6 max-w-xl">
            <h3 className="text-base font-semibold text-[#F1F5F9] mb-1">Profile Information</h3>
            <p className="text-sm text-[#94A3B8] mb-6">Update your personal details</p>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="w-16 h-16 rounded-full gradient-avatar flex items-center justify-center text-white font-bold text-xl">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <p className="text-base font-semibold text-[#F1F5F9]">{user.name}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5A6BFF]/15 text-[#5A6BFF] mt-1">
                  {user.role === 'admin' ? 'Admin' : 'Member'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full input-dark px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full input-dark px-4 py-2.5 text-sm opacity-50 cursor-not-allowed"
                />
                <p className="text-xs text-[#64748B] mt-1">Email cannot be changed</p>
              </div>

              <button
                onClick={handleSave}
                className="btn-gradient px-5 py-2.5 text-sm flex items-center gap-2 mt-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && user && (
          <div className="space-y-6 max-w-xl">
            <div className="card-surface p-6">
              <h3 className="text-base font-semibold text-[#F1F5F9] mb-1">Account Details</h3>
              <p className="text-sm text-[#94A3B8] mb-6">Information about your account</p>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-sm text-[#94A3B8]">Member since</span>
                  <span className="text-sm text-[#F1F5F9] font-medium">{memberSince}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm text-[#94A3B8]">Account type</span>
                  <span className="text-sm text-[#F1F5F9] font-medium capitalize">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="card-surface p-6 border-[#FF3B30]/20">
              <h3 className="text-base font-semibold text-[#FF3B30] mb-1">Danger Zone</h3>
              <p className="text-sm text-[#94A3B8] mb-4">Irreversible actions for your account</p>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2.5 border border-[#FF3B30]/30 text-[#FF3B30] rounded-xl text-sm font-medium hover:bg-[#FF3B30]/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppLayout>
  );
}
