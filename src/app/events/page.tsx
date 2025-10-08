'use client'

import React from 'react'
import { useApp } from '@/src/lib/context/AppContext'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'
import { AddEventModal } from '@/src/components/modals/AddEventModal'

export default function EventsPage() {
  const { state, navigateTo, openModal } = useApp()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="events">
        <UserAvatar />
        <BackButton onBack={() => navigateTo('dashboard')} />
        
        {/* Header */}
        <div className="absolute left-[94px] top-[38px]">
          <h1 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[36px] text-[#060a24] tracking-[0.72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Events
          </h1>
        </div>
        
        {/* Upcoming Event Card */}
        <div className="absolute bg-[#060a24] h-[110px] left-[20px] rounded-[12px] text-white top-[130px] w-[400px] px-[24px] py-[18px]">
          <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[18px] mb-[8px] tracking-[0.72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Upcoming Event:
          </div>
          <div className="flex justify-between items-center">
            <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[22px] tracking-[0.88px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {state.events[0]?.name || 'Book Club Meeting'}
            </div>
            <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] tracking-[0.8px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {state.events[0]?.time || '4:00PM'}
            </div>
          </div>
        </div>

        {/* Other Events - Using Queue Data Structure */}
        <div className="absolute left-[20px] top-[260px] w-[400px] flex flex-col gap-[18px]">
          {state.events.slice(1).map((event) => (
            <div key={event.id} className="bg-[rgba(213,206,206,0.5)] h-[90px] w-full rounded-[12px] px-[24px] py-[16px]">
              <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-black mb-[6px] tracking-[0.8px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {event.name}
              </div>
              <div className="font-['Instrument_Sans:Regular',_sans-serif] text-[17px] text-black tracking-[0.68px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {event.date} {event.time}
              </div>
            </div>
          ))}
        </div>

        {/* Add Event Button */}
        <button 
          className="absolute bg-[#060a24] cursor-pointer h-[56px] right-[20px] rounded-[12px] bottom-[120px] w-[170px] hover:bg-[#060a24]/90 transition-colors"
          onClick={() => openModal('addEvent')}
        >
          <div className="font-['Instrument_Sans:Medium',_sans-serif] font-medium text-[19px] text-white tracking-[0.76px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Add event  +
          </div>
        </button>

        <ProfileIcon onClick={() => navigateTo('profile')} />

        {/* Modal */}
        {state.currentModal === 'addEvent' && <AddEventModal />}
      </div>
    </div>
  )
}
