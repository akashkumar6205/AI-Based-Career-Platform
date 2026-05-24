import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[100px]" />
      </div>

      {/* Form card */}
      <div className="relative w-full max-w-[720px] rounded-2xl border border-gray-700/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
        <LoginForm isModal={false} />
      </div>
    </div>
  );
};

export default LoginPage;
