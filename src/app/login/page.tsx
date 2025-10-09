'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useApp } from '@/src/lib/context/AppContext'
import { useAuth } from '@/lib/context/AuthContext'
import imgImage1 from "@/assets/adf34d48bf7a198a375097795321c7f10f36f03c.png"

export default function LoginPage() {
  const { navigateTo } = useApp()
  const { signIn } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    try {
      setLoading(true)
      setError('')
      await signIn(email, password)
      // On success, navigate to dashboard
      navigateTo('dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div
        className="relative h-[956px] w-[440px] overflow-auto bg-[#f0ecec]"
        data-name="Login Page"
      >
        {/* Title */}
        <div
          className="absolute flex items-center justify-center left-[50%] top-[calc(50%-334px)] translate-x-[-50%]"
        >
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[#060a24] text-[44px] text-center tracking-[2.64px]">
            SENIOR CARE
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute left-[50px] right-[50px] top-[310px] bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        {/* Labels */}
        <p className="absolute left-[75px] top-[340px] text-[22px] text-black font-semibold tracking-[1.02px] text-left w-[309px] mb-1">
          Username (Email)
        </p>
        <p className="absolute left-[75px] top-[426px] text-[22px] text-black font-semibold tracking-[1.02px] text-left w-[309px] mb-1">
          Password
        </p>

        {/* Input fields - Email */}
        <input
          type="email"
          placeholder="enter your username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[371px] w-[309px] px-[20px] text-white text-[20px] placeholder-white/70 border-none outline-none"
          autoComplete="email"
        />

        {/* Input fields - Password */}
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[458px] w-[309px] px-[20px] text-white text-[20px] placeholder-white/70 border-none outline-none"
          autoComplete="current-password"
        />

        {/* Login Button */}
        <button
          className="absolute bg-[#060a24] h-[48px] left-[78px] rounded-[44px] top-[538px] w-[273px] cursor-pointer hover:bg-[#060a24]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleLogin}
          disabled={loading}
        >
          <span className="text-white text-[17px] font-semibold tracking-[1.02px]">
            {loading ? 'Logging in...' : 'Login'}
          </span>
        </button>

        {/* Welcome Text */}
        <div className="absolute left-[50%] top-[272px] translate-x-[-50%] text-center w-[440px]">
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[17px] text-black tracking-[1.02px]">
            Welcome back! Please login.
          </p>
        </div>

        {/* Logo Circle */}
        <div className="absolute left-[190px] size-[66px] top-[76px]">
          <svg className="block size-full" fill="none" viewBox="0 0 66 66">
            <circle cx="33" cy="33" fill="#D8E4EE" r="33" />
          </svg>
        </div>

        {/* Logo Image */}
        <div className="absolute h-[46px] left-[189px] top-[86px] w-[69px]" data-name="image 1">
          <Image
            alt="SeniorCare Logo"
            className="absolute inset-0 object-cover pointer-events-none"
            src={imgImage1}
            fill
          />
        </div>

        {/* Bottom links */}
        <div className="absolute left-[50px] right-[50px] flex justify-between top-[620px] text-[14px]">
          <button
            className="text-[#060a24] underline cursor-pointer"
            onClick={() => navigateTo('forgot-password')}
          >
            Forgot Password?
          </button>
          <button
            className="text-[#060a24] underline cursor-pointer"
            onClick={() => navigateTo('signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
