import React, { useState, useContext } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Github, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const SignUpForm = () => {
  const { backendUrl, setIsLoggedin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!passwordsMatch) {
    toast.error('Passwords do not match');
    return;
  }
  
  if (!formData.agreeToTerms) {
    toast.error('Please agree to the terms and conditions');
    return;
  }

  setIsLoading(true);

  try {
    axios.defaults.withCredentials = true;
    
    // Combine first and last name
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    
    // Ensure the URL is properly formatted
    const apiUrl = `${backendUrl}${backendUrl.endsWith('/') ? '' : '/'}api/auth/register`;
    console.log('API URL:', apiUrl); // Debug the final URL
    
    const { data } = await axios.post(apiUrl, {
      name: fullName,
      email: formData.email,
      password: formData.password
    });

    if (data.success) {
      setIsLoggedin(true);
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error(data.message || 'Sign up failed');
    }
  } catch (error) {
    console.error('Sign up error:', error);
    toast.error(error.response?.data?.message || 'Sign up failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
}
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ''

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/70">Join us and secure your digital world</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-lg"
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password field */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-lg ${
                  formData.confirmPassword === '' 
                    ? 'border-white/20 focus:ring-cyan-400' 
                    : passwordsMatch 
                      ? 'border-green-400 focus:ring-green-400' 
                      : 'border-red-400 focus:ring-red-400'
                }`}
                placeholder="Confirm your password"
                required
              />
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                {formData.confirmPassword !== '' && (
                  passwordsMatch ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <div className="h-5 w-5 text-red-400 text-xs flex items-center justify-center font-bold">✕</div>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {formData.confirmPassword !== '' && !passwordsMatch && (
              <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Terms and conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2 mt-1"
              required
            />
            <label className="text-sm text-white/70 leading-5">
              I agree to the{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={!formData.agreeToTerms || !passwordsMatch}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white/70">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-all duration-200">
              <Github className="h-5 w-5" />
            </button>
            <button className="w-full inline-flex justify-center py-3 px-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-all duration-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/70">
        Already have an account?{' '}
        <button 
          onClick={() => navigate('/login')}
          className="text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          Sign in
        </button>
      </p>
    </div>
    </div>
  )
}

export default SignUpForm
