import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempted with:', { email, password });
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-green-100">
        <div className="flex justify-center mb-6">
          {/* Logo - similar to the "Z" logo shown in the image */}
          <div className="relative h-12 w-12">
            <div className="absolute w-12 h-12 bg-yellow-400 transform rotate-12"></div>
            <div className="absolute top-0 left-0 w-12 h-12 bg-black" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-800 text-lg font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}