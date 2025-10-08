'use client'

import React from 'react'
import Image from 'next/image'
import { useApp } from '@/src/lib/context/AppContext'
import imgImage1 from "@/assets/adf34d48bf7a198a375097795321c7f10f36f03c.png"

export default function SignupPage() {
  const { navigateTo } = useApp()

  const handleSignup = () => {
    // Handle signup logic here
    navigateTo('dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-auto bg-[#f0ecec]" data-name="Signup Page">
        <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.008486481383442879)+(var(--transform-inner-height)*0.9999639987945557)))] items-center justify-center left-[calc(50%+0.231px)] mix-blend-multiply top-[calc(50%-294px)] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*0.008486481383442879)+(var(--transform-inner-width)*0.9999639987945557)))]" style={{ "--transform-inner-width": "432", "--transform-inner-height": "15" } as React.CSSProperties}>
          <div className="flex-none rotate-[359.514deg]">
            <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[15px] leading-[normal] relative text-[#060a24] text-[44px] text-center tracking-[2.64px] w-[432.351px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              SENIOR CARE
            </p>
          </div>
        </div>
        
        <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[300px] w-[309px]" />
        <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[371px] w-[309px]" />
        <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[442px] w-[309px]" />
        <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[513px] w-[309px]" />
        
        <button 
          className="absolute bg-[#060a24] h-[48px] left-[78px] rounded-[44px] top-[580px] w-[273px] cursor-pointer"
          onClick={handleSignup}
        />
        
        <div className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[194px] text-[17px] text-black text-center top-[250px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="mb-0">{`Create your account `}</p>
          <p>&nbsp;</p>
        </div>
        
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[123px] text-[17px] text-black text-center top-[280px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Full Name
        </p>
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[123px] text-[17px] text-black text-center top-[351px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Email
        </p>
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[123px] text-[17px] text-black text-center top-[422px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Username
        </p>
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[123px] text-[17px] text-black text-center top-[493px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Password
        </p>
        
        <div className="absolute left-[190px] size-[66px] top-[116px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
            <circle cx="33" cy="33" fill="var(--fill-0, #D8E4EE)" id="Ellipse 1" r="33" />
          </svg>
        </div>
        <div className="absolute h-[46px] left-[189px] top-[126px] w-[69px]" data-name="image 1">
          <Image alt="SeniorCare Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} fill />
        </div>
        
        <p className="absolute font-['Inria_Sans:Regular',_sans-serif] h-[19px] leading-[normal] left-[170px] not-italic text-[20px] text-center text-white top-[315px] tracking-[-0.2px] translate-x-[-50%] w-[184px]">{` enter your full name`}</p>
        <p className="absolute font-['Inria_Sans:Regular',_sans-serif] h-[19px] leading-[normal] left-[170px] not-italic text-[20px] text-center text-white top-[386px] tracking-[-0.2px] translate-x-[-50%] w-[184px]">{` enter your email`}</p>
        <p className="absolute font-['Inria_Sans:Regular',_sans-serif] h-[19px] leading-[normal] left-[170px] not-italic text-[20px] text-center text-white top-[457px] tracking-[-0.2px] translate-x-[-50%] w-[184px]">{` create username`}</p>
        <p className="absolute font-['Inria_Sans:Regular',_sans-serif] h-[19px] leading-[normal] left-[170px] not-italic text-[20px] text-center text-white top-[528px] tracking-[-0.2px] translate-x-[-50%] w-[184px]">{` create password`}</p>
        
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[14px] leading-[normal] left-[214.5px] text-[#ece5e5] text-[17px] text-center top-[595px] tracking-[1.02px] translate-x-[-50%] w-[135px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sign Up
        </p>
        
        <button 
          className="absolute cursor-pointer left-[194px] text-[14px] text-[#060a24] top-[650px] translate-x-[-50%] underline"
          onClick={() => navigateTo('login')}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  )
}
