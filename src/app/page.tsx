'use client'

import React from 'react'
import Image from 'next/image'
import { useApp } from '@/src/lib/context/AppContext'
import imgImage1 from "@/assets/adf34d48bf7a198a375097795321c7f10f36f03c.png"

export default function Home() {
  const { navigateTo } = useApp()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="Home Page">
        {/* Logo Circle */}
        <div className="absolute left-[187px] size-[66px] top-[150px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
            <circle cx="33" cy="33" fill="var(--fill-0, #D8E4EE)" id="Ellipse 1" r="33" />
          </svg>
        </div>
        
        {/* Logo Image */}
        <div className="absolute h-[46px] left-[186px] top-[160px] w-[69px]" data-name="logo">
          <Image alt="SeniorCare Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} fill />
        </div>

        {/* App Title */}
        <div className="absolute flex items-center justify-center left-[50%] top-[260px] translate-x-[-50%]">
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] text-[#060a24] text-[44px] text-center tracking-[2.64px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            SeniorCare
          </p>
        </div>

        {/* Subtitle */}
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold leading-[normal] left-[50%] text-[20px] text-black text-center top-[320px] tracking-[1.2px] translate-x-[-50%] w-[380px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Your Daily Life Companion
        </p>

        {/* Login Button */}
        <button 
          className="absolute bg-[#060a24] h-[64px] left-[39px] rounded-[12px] top-[443px] w-[362px] cursor-pointer hover:bg-[#060a24]/90 transition-colors"
          onClick={() => navigateTo('login')}
        >
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[#ece5e5] text-[22px] text-center tracking-[1.32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Login
          </p>
        </button>

        {/* Continue as Guest Button */}
        <button 
          className="absolute bg-white border-2 border-[#060a24] h-[64px] left-[39px] rounded-[12px] top-[549px] w-[362px] cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigateTo('dashboard')}
        >
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[#060a24] text-[22px] text-center tracking-[1.32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Continue as Guest
          </p>
        </button>

        {/* Bottom Tagline */}
        <p className="absolute font-['Instrument_Sans:Regular',_sans-serif] leading-[normal] left-[50%] text-[16px] text-[#6b6868] text-center top-[700px] tracking-[0.8px] translate-x-[-50%] w-[380px]">
          Making everyday tasks easier for seniors
        </p>
      </div>
    </div>
  )
}
