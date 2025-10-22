'use client'

import React from 'react'
import { useApp } from '@/lib/context/AppContext'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'
import { AddEventModal } from '@/src/components/modals/AddEventModal'
import { useEvents } from '@/lib/hooks/useEvents'
import type { Event } from '@/lib/types'

export default function EventsPage() {
  const { navigateTo, openModal, state } = useApp()
  const { events, loading, error, refreshEvents } = useEvents()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading events...</div>
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="events">
        <UserAvatar />
        <BackButton onBack={() => navigateTo('dashboard')} />
        
        {/* Header */}
        <div className="absolute left-[94px] top-[38px] flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="#060a24"/>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#060a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[36px] text-[#060a24] tracking-[0.72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Events
          </h1>
        </div>
        
        {/* Upcoming Event Card */}
        <div className="absolute bg-[#060a24] h-[110px] left-[20px] rounded-[12px] text-white top-[130px] w-[400px] px-[24px] py-[18px]">
          <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[16px] mb-[8px] tracking-[0.72px] text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
            Upcoming Event
          </div>
          <div className="flex justify-between items-center">
            <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[24px] tracking-[0.88px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {events[0]?.name || 'Morning Walk'}
            </div>
            <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[22px] tracking-[0.8px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {events[0]?.time || '6:00 AM'}
            </div>
          </div>
        </div>

        {/* Other Events - Using Queue Data Structure */}
        <div className="absolute left-[20px] top-[260px] w-[400px] h-[600px] overflow-y-auto flex flex-col gap-[18px] pr-2">
          {events.slice(1).map((event: Event) => (
            <div key={event.id} className="bg-[rgba(213,206,206,0.5)] h-[90px] w-full rounded-[12px] px-[24px] py-[16px]">
              <div className="flex justify-between items-center mb-2">
                <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-black tracking-[0.8px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {event.name}
                </div>
                <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[18px] text-[#060a24] tracking-[0.8px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {event.time}
                </div>
              </div>
              <div className="font-['Instrument_Sans:Regular',_sans-serif] text-[15px] text-gray-600 tracking-[0.68px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {event.date}
              </div>
            </div>
          ))}
        </div>

        {/* Add Event Button */}
        <button 
          className="absolute bg-[#060a24] cursor-pointer h-[56px] right-[20px] rounded-[12px] bottom-[120px] w-[170px] hover:bg-[#060a24]/90 transition-colors flex items-center justify-center gap-2"
          onClick={() => openModal('addEvent')}
        >
          <span className="font-['Instrument_Sans:Medium',_sans-serif] font-medium text-[19px] text-white tracking-[0.76px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Add Event
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <ProfileIcon onClick={() => navigateTo('profile')} />

        {/* Modal */}
        {state.currentModal === 'addEvent' && <AddEventModal refreshEvents={refreshEvents} />}
      </div>
    </div>
  )
}
