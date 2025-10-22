'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useApp } from '@/lib/context/AppContext'
import { useAuth } from '@/lib/context/AuthContext'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'
import imgImage2 from "@/assets/47243cdeba5524e77ffe61ec138b163174d97bef.png"
import imgImage3 from "@/assets/8934c08138832d203b27de68634a565c5a720853.png"
import imgImage4 from "@/assets/b63a088baeee6c767fd80a6e91af96cd71cdfd70.png"
import imgImage5 from "@/assets/c846a00cd019247848e76f1836c41d9aea45c9d3.png"

interface NextReminder {
  medicineName: string
  dosage: string
  timeUntil: string
}

export default function DashboardPage() {
  const { navigateTo } = useApp()
  const { user } = useAuth()
  const [nextReminder, setNextReminder] = useState<NextReminder | null>(null)
  const [username, setUsername] = useState<string>('User')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) {
      fetchNextReminder()
      fetchUsername()
    }
  }, [user?.uid])

  const fetchNextReminder = async () => {
    if (!user?.uid) return
    try {
      const response = await fetch(`/api/medicine/reminders?userId=${user.uid}`)
      const data = await response.json()
      console.log('Dashboard reminder data:', data)
      if (data.success && data.nextReminder) {
        setNextReminder(data.nextReminder)
      }
    } catch (error) {
      console.error('Error fetching next reminder:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsername = async () => {
    if (!user?.uid) return
    try {
      const response = await fetch(`/api/auth/profile?userId=${user.uid}`)
      const data = await response.json()
      if (data.user?.name) {
        setUsername(data.user.name)
      }
    } catch (error) {
      console.error('Error fetching username:', error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="dashboard">
        <UserAvatar />
        <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[36px] leading-[normal] left-[258.5px] text-[23px] text-black text-center top-[61px] tracking-[1.38px] translate-x-[-50%] w-[373px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Welcome back, {username}
        </p>
        
        {/* Medicine Reminder - Using Priority Queue */}
        {nextReminder ? (
          <div className="absolute bg-[#060a24] h-[103px] left-[20px] rounded-[12px] top-[139px] w-[403px] flex items-center justify-between px-[31px]">
            <div className="flex flex-col justify-center">
              <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[24px] text-white tracking-[1.38px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Medicine Reminder!
              </p>
              <p className="font-['Instrument_Sans:Regular',_sans-serif] text-[20px] text-white tracking-[0.8px] mt-[4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {nextReminder.medicineName} {nextReminder.dosage}
              </p>
            </div>
            <div className="text-right">
              <p className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[20px] text-[#4ade80]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {nextReminder.timeUntil}
              </p>
            </div>
          </div>
        ) : (
          <div className="absolute bg-[#060a24] h-[103px] left-[20px] rounded-[12px] top-[139px] w-[403px] flex items-center justify-center">
            <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
              No medicines scheduled
            </p>
          </div>
        )}

        {/* Category Cards */}
        <button 
          className="absolute bg-[#060a24] h-[253px] left-[12px] rounded-[12px] top-[294px] w-[200px] cursor-pointer"
          onClick={() => navigateTo('wallet')}
        />
        <button 
          className="absolute bg-[#060a24] h-[253px] left-[230px] rounded-[12px] top-[294px] w-[200px] cursor-pointer"
          onClick={() => navigateTo('medicine')}
        />
        <button 
          className="absolute bg-[#060a24] h-[253px] left-[12px] rounded-[12px] top-[579px] w-[200px] cursor-pointer"
          onClick={() => navigateTo('grocery')}
        />
        <button 
          className="absolute bg-[#060a24] h-[253px] left-[230px] rounded-[12px] top-[579px] w-[200px] cursor-pointer"
          onClick={() => navigateTo('events')}
        />

        {/* Category Images */}
        <div className="absolute left-[43px] rounded-[12px] size-[138px] top-[340px]" data-name="image 2">
          <Image alt="Wallet" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImage2} fill />
        </div>
        <div className="absolute left-[261px] rounded-[12px] size-[138px] top-[340px]" data-name="image 3">
          <Image alt="Medicine" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImage3} fill />
        </div>
        <div className="absolute left-[44px] rounded-[12px] size-[138px] top-[623px]" data-name="image 4">
          <Image alt="Grocery" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImage4} fill />
        </div>
        <div className="absolute left-[261px] rounded-[12px] size-[138px] top-[623px]" data-name="image 5">
          <Image alt="Events" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgImage5} fill />
        </div>

        {/* Category Labels */}
        <div className="absolute contents font-['Instrument_Sans:Bold',_sans-serif] font-bold leading-[33px] left-[40px] text-[28px] text-white top-[499px] tracking-[1.12px]">
          <p className="absolute h-[40px] left-[46px] top-[499px] w-[126px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            WALLET
          </p>
          <p className="absolute h-[40px] left-[256px] top-[499px] w-[156px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            MEDICINE
          </p>
          <p className="absolute h-[40px] left-[40px] top-[781px] w-[156px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            GROCERY
          </p>
          <p className="absolute h-[40px] left-[274px] top-[781px] w-[156px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            EVENTS
          </p>
        </div>

        <ProfileIcon onClick={() => navigateTo('profile')} />
      </div>
    </div>
  )
}
