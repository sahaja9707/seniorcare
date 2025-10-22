'use client'

import React from 'react'
import Image from 'next/image'
import { useApp } from '@/lib/context/AppContext'
import { useAuth } from '@/lib/context/AuthContext'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { LogoutModal } from '@/components/modals/LogoutModal'
import imgImage6 from "@/assets/7d87c8971bb3af100a42ffd2b10a81f7835a88b9.png"
import imgImage8 from "@/assets/59a713b5139d8aefcf946285545fe736cb99db1f.png"

export default function ProfilePage() {
  const { state, navigateTo, openModal } = useApp()
  const { userData, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div>Loading...</div>
      </div>
    )
  }

  if (!userData) {
    navigateTo('login')
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-white">
        <div className="absolute h-[161px] left-[62px] top-[109px] w-[258px]" data-name="image 7">
          <Image alt="Profile" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} fill />
        </div>
        <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[45px] justify-end leading-[0] left-[191.5px] text-[38px] text-black text-center top-[315px] tracking-[1.52px] translate-x-[-50%] translate-y-[-100%] w-[243px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">{userData.name || 'User'}</p>
        </div>
        <div className="absolute flex flex-col font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[136px] justify-end leading-[normal] left-[33px] text-[21px] text-black top-[454px] tracking-[0.84px] translate-y-[-100%] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="mb-0">Full Name: {userData.name || 'Not set'}</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">Email ID: {userData.email}</p>
        </div>
        <UserAvatar />
        <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[35px] justify-end leading-[0] left-[109px] text-[31px] text-black top-[76px] tracking-[-0.31px] translate-y-[-100%] w-[192px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">User Profile</p>
        </div>
        <BackButton onBack={() => navigateTo('dashboard')} />
        <button 
          className="absolute block cursor-pointer left-[313px] size-[56px] top-[619px]" 
          data-name="image 8"
          onClick={() => openModal('logout')}
        >
          <Image alt="Logout" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} fill />
        </button>

        {/* Modal */}
        {state.currentModal === 'logout' && <LogoutModal />}
      </div>
    </div>
  )
}
