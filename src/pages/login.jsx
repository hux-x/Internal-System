import React, { useState } from 'react';
import loginImg from '../assets/login.png'; // Ensure you have an image at this path

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left side - Illustration */}
        <div className="hidden lg:flex flex-1 bg-white relative p-6 sm:p-8 lg:p-12 items-center justify-center order-2 lg:order-1">
        <div className="w-full max-w-md lg:max-w-none">
            <img 
              src={loginImg} 
              alt="Login illustration" 
              className="w-full h-auto object-contain max-h-64 sm:max-h-80 lg:max-h-none" />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center max-w-full lg:max-w-md order-1 lg:order-2">
          <div className="w-full max-w-sm mx-auto lg:max-w-none lg:mx-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">
              Sign In
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                />
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 select-none">
                  Remember me {/* save to local storage */}
                </label>
              </div>

              {/* Sign in button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 text-sm sm:text-base active:bg-blue-800"
              >
                Sign In
              </button>

              {/* Additional spacing for mobile */}
              <div className="pt-4 sm:pt-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}