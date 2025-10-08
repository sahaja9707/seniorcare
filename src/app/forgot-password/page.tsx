'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useApp } from '@/src/lib/context/AppContext'
import imgImage1 from "@/assets/adf34d48bf7a198a375097795321c7f10f36f03c.png"

export default function ForgotPasswordPage() {
  const { navigateTo } = useApp()
  const [email, setEmail] = useState('')

  const handleResetPassword = () => {
    if (email.trim()) {
      alert('Password reset link sent to your email!')
      navigateTo('login')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="Forgot Password Page">
        
        {/* Logo Circle */}
        <div className="absolute left-[187px] size-[66px] top-[100px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
            <circle cx="33" cy="33" fill="var(--fill-0, #D8E4EE)" id="Ellipse 1" r="33" />
          </svg>
        </div>
        
        {/* Logo Image */}
        <div className="absolute h-[46px] left-[186px] top-[110px] w-[69px]" data-name="logo">
          <Image alt="SeniorCare Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} fill />
        </div>

        {/* App Title */}
        <div className="absolute flex items-center justify-center left-[50%] top-[200px] translate-x-[-50%]">
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] text-[#060a24] text-[38px] text-center tracking-[2.28px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            SENIOR CARE
          </p>
        </div>

        {/* RESET PASSWORD Title */}
        <h2 className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] left-[50%] text-[24px] text-black text-center top-[315px] tracking-[1px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
          RESET PASSWORD
        </h2>

        {/* Email Label */}
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] left-[65px] text-[16px] text-black top-[390px] tracking-[0.96px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Email Address
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="absolute bg-[#aca8a8] h-[54px] left-[65px] rounded-[20px] top-[420px] w-[309px] px-[24px] font-['Inria_Sans:Regular',_sans-serif] text-[18px] text-white placeholder-white/70 border-none outline-none"
        />

        {/* Reset Password Button */}
        <button 
          className="absolute bg-[#060a24] h-[54px] left-[65px] rounded-[20px] top-[490px] w-[309px] cursor-pointer hover:bg-[#060a24]/90 transition-colors disabled:opacity-50"
          onClick={handleResetPassword}
          disabled={!email.trim()}
        >
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[#ece5e5] text-[18px] text-center tracking-[1.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Reset Password
          </p>
        </button>

        {/* Back to Login Link */}
        <button 
          className="absolute cursor-pointer left-[50%] text-[15px] text-[#060a24] top-[560px] translate-x-[-50%] underline hover:text-[#060a24]/80 transition-colors font-['Instrument_Sans:SemiBold',_sans-serif] tracking-[0.6px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
          onClick={() => navigateTo('login')}
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}