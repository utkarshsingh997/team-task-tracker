import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, signup } = useAuthContext();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');

  // Sign in fields
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signinError, setSigninError] = useState('');
  const [showSigninPassword, setShowSigninPassword] = useState(false);

  // Sign up fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<'admin' | 'member'>('member');
  const [signupError, setSignupError] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    setSigninError('');
    if (!signinEmail.trim() || !signinPassword.trim()) {
      setSigninError('Please fill in all fields');
      return;
    }
    const success = login(signinEmail.trim(), signinPassword);
    if (success) {
      navigate('/dashboard');
    } else {
      setSigninError('Invalid email or password');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setSignupError('Please fill in all fields');
      return;
    }
    const success = signup(signupName.trim(), signupEmail.trim(), signupPassword, signupRole);
    if (success) {
      navigate('/dashboard');
    } else {
      setSignupError('An account with this email already exists');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1F] flex flex-col items-center justify-center px-4 page-fade-in">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-[#F1F5F9]">TaskFlow</span>
      </div>

      {/* Card */}
      <div className="card-surface w-full max-w-[420px] p-8">
        <h1 className="text-xl font-bold text-[#F1F5F9] text-center mb-1">
          {tab === 'signin' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="text-sm text-[#94A3B8] text-center mb-6">
          {tab === 'signin' ? 'Enter your credentials to access your workspace' : 'Fill in your details to get started'}
        </p>

        {/* Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setTab('signin'); setSigninError(''); }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${tab === 'signin' ? 'gradient-primary text-white' : 'text-[#94A3B8] hover:text-[#F1F5F9]'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setSignupError(''); }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${tab === 'signup' ? 'gradient-primary text-white' : 'text-[#94A3B8] hover:text-[#F1F5F9]'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        {tab === 'signin' && (
          <form onSubmit={handleSignin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Email</label>
              <input
                type="email"
                value={signinEmail}
                onChange={e => { setSigninEmail(e.target.value); setSigninError(''); }}
                className="w-full input-dark px-4 py-2.5 text-sm"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showSigninPassword ? 'text' : 'password'}
                  value={signinPassword}
                  onChange={e => { setSigninPassword(e.target.value); setSigninError(''); }}
                  className="w-full input-dark px-4 py-2.5 text-sm pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowSigninPassword(!showSigninPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#94A3B8]"
                >
                  {showSigninPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {signinError && <p className="text-[#FF3B30] text-xs">{signinError}</p>}
            <button type="submit" className="w-full btn-gradient py-2.5 text-sm">
              Sign In
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {tab === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Full Name</label>
              <input
                type="text"
                value={signupName}
                onChange={e => { setSignupName(e.target.value); setSignupError(''); }}
                className="w-full input-dark px-4 py-2.5 text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Email</label>
              <input
                type="email"
                value={signupEmail}
                onChange={e => { setSignupEmail(e.target.value); setSignupError(''); }}
                className="w-full input-dark px-4 py-2.5 text-sm"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={e => { setSignupPassword(e.target.value); setSignupError(''); }}
                  className="w-full input-dark px-4 py-2.5 text-sm pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#94A3B8]"
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Account Type</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={signupRole === 'admin'}
                    onChange={() => setSignupRole('admin')}
                    className="w-4 h-4 accent-[#5A6BFF]"
                  />
                  <span className="text-sm text-[#F1F5F9]">Admin</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="member"
                    checked={signupRole === 'member'}
                    onChange={() => setSignupRole('member')}
                    className="w-4 h-4 accent-[#5A6BFF]"
                  />
                  <span className="text-sm text-[#F1F5F9]">Member</span>
                </label>
              </div>
            </div>
            {signupError && <p className="text-[#FF3B30] text-xs">{signupError}</p>}
            <button type="submit" className="w-full btn-gradient py-2.5 text-sm">
              Create Account
            </button>
          </form>
        )}
      </div>

      <p className="text-sm text-[#64748B] mt-6">Team Task Manager — Organize, Track, Deliver</p>
    </div>
  );
}
