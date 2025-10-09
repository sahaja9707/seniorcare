'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useApp } from '@/src/lib/context/AppContext'
import { useAuth } from '@/lib/context/AuthContext'
import imgImage1 from "@/assets/adf34d48bf7a198a375097795321c7f10f36f03c.png"

export default function SignupPage() {
  const { navigateTo } = useApp()
  const { signUp } = useAuth()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      setError('')
      await signUp(email, password, name)
      // On success, navigate to dashboard
      navigateTo('dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignup()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-auto bg-[#f0ecec]" data-name="Signup Page">
        {/* Title */}
        <div className="absolute flex items-center justify-center left-[50%] top-[116px] translate-x-[-50%]">
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[#060a24] text-[44px] text-center tracking-[2.64px]">
            SENIOR CARE
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute left-[50px] right-[50px] top-[220px] bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm">
            {error}
          </div>
        )}
        
        {/* Welcome Text */}
        <div className="absolute left-[50%] top-[250px] translate-x-[-50%] text-center w-[440px]">
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[17px] text-black tracking-[1.02px]">
            Create your account
          </p>
        </div>

        {/* Labels */}
        <p className="absolute left-[75px] top-[278px] text-[17px] text-black font-semibold tracking-[1.02px]">
          Full Name
        </p>
        <p className="absolute left-[75px] top-[349px] text-[17px] text-black font-semibold tracking-[1.02px]">
          Email
        </p>
        <p className="absolute left-[75px] top-[420px] text-[17px] text-black font-semibold tracking-[1.02px]">
          Password
        </p>
        <p className="absolute left-[75px] top-[491px] text-[17px] text-black font-semibold tracking-[1.02px]">
          Confirm Password
        </p>
        
        {/* Input Fields */}
        <input
          type="text"
          placeholder="enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[300px] w-[309px] px-[20px] text-white text-[18px] placeholder-white/70 border-none outline-none"
          autoComplete="name"
        />
        
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[371px] w-[309px] px-[20px] text-white text-[18px] placeholder-white/70 border-none outline-none"
          autoComplete="email"
        />
        
        <input
          type="password"
          placeholder="create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[442px] w-[309px] px-[20px] text-white text-[18px] placeholder-white/70 border-none outline-none"
          autoComplete="new-password"
        />
        
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[513px] w-[309px] px-[20px] text-white text-[18px] placeholder-white/70 border-none outline-none"
          autoComplete="new-password"
        />
        
        {/* Sign Up Button */}
        <button 
          className="absolute bg-[#060a24] h-[48px] left-[78px] rounded-[44px] top-[580px] w-[273px] cursor-pointer hover:bg-[#060a24]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSignup}
          disabled={loading}
        >
          <span className="text-white text-[17px] font-semibold tracking-[1.02px]">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </span>
        </button>
        {/* Sign Up Button */}
        <button 
          className="absolute bg-[#060a24] h-[48px] left-[78px] rounded-[44px] top-[580px] w-[273px] cursor-pointer hover:bg-[#060a24]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSignup}
          disabled={loading}
        >
          <span className="text-white text-[17px] font-semibold tracking-[1.02px]">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </span>
        </button>

        {/* Logo Circle */}
        <div className="absolute left-[190px] size-[66px] top-[50px]">
          <svg className="block size-full" fill="none" viewBox="0 0 66 66">
            <circle cx="33" cy="33" fill="#D8E4EE" r="33" />
          </svg>
        </div>
        
        {/* Logo Image */}
        <div className="absolute h-[46px] left-[189px] top-[60px] w-[69px]" data-name="image 1">
          <Image 
            alt="SeniorCare Logo" 
            className="absolute inset-0 object-cover pointer-events-none" 
            src={imgImage1} 
            fill 
          />
        </div>
        
        {/* Bottom Link */}
        <button 
          className="absolute cursor-pointer left-[50%] text-[14px] text-[#060a24] top-[650px] translate-x-[-50%] underline"
          onClick={() => navigateTo('login')}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  )
}
