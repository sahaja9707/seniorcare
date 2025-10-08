'use client'

import React from 'react'
import Image from 'next/image'
import { useApp } from '@/src/lib/context/AppContext'
import imgImage1 from "@/assets/adf34d48bf7a198a375097795321c7f10f36f03c.png"

export default function LoginPage() {
  const { handleLogin, navigateTo } = useApp()

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

        {/* Input fields background */}
        <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[371px] w-[309px]" />
        <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[458px] w-[309px]" />

        {/* Login Button */}
        <button
          className="absolute bg-[#060a24] h-[48px] left-[78px] rounded-[44px] top-[538px] w-[273px] cursor-pointer"
          onClick={handleLogin}
        >
          <span className="text-white text-[17px] font-semibold tracking-[1.02px]">
            Login
          </span>
        </button>

        {/* Welcome Text */}
        <div className="absolute left-[50%] top-[272px] translate-x-[-50%] text-center w-[440px]">
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[17px] text-black tracking-[1.02px]">
            Welcome back! Please login.
          </p>
        </div>

        {/* Labels - higher and larger */}
        <p className="absolute left-[75px] top-[340px] text-[22px] text-black font-semibold tracking-[1.02px] text-left w-[309px] mb-1">
          Username
        </p>
        <p className="absolute left-[75px] top-[426px] text-[22px] text-black font-semibold tracking-[1.02px] text-left w-[309px] mb-1">
          Password
        </p>

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

        {/* Placeholder text inside inputs - aligned left */}
          {/* Placeholder text inside inputs - higher in the box */}
          <p className="absolute left-[85px] top-[378px] text-white text-[20px] not-italic text-left w-[289px]">
            enter your username
          </p>
          <p className="absolute left-[85px] top-[465px] text-white text-[20px] not-italic text-left w-[289px]">
            enter your password
          </p>

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
