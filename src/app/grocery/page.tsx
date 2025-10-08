'use client'

import React, { useState } from 'react'
import { useApp } from '@/src/lib/context/AppContext'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'

export default function GroceryPage() {
  const { state, navigateTo } = useApp()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter items based on search query
  const filteredItems = state.groceryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="grocery">
        <UserAvatar />
        <BackButton onBack={() => navigateTo('dashboard')} />
        
        {/* Header */}
        <div className="absolute left-[94px] top-[38px]">
          <h1 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[36px] text-[#060a24] tracking-[0.72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Grocery
          </h1>
        </div>

        {/* Search Bar - Hash Table/Map for efficient searching */}
        <div className="absolute left-[20px] top-[120px] w-[400px]">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[50px] bg-[#aca8a8] rounded-[12px] pl-[28px] pr-[22px] font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-white placeholder-white/70 border-none outline-none"
          />
        </div>
        
        {/* Grocery Items - Using Array/List Data Structure */}
        <div className="absolute left-[20px] top-[190px] w-[400px] flex flex-col gap-[14px]">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-[rgba(213,206,206,0.4)] h-[60px] w-full rounded-[8px] flex items-center justify-between px-6">
              <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[26px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                {item.name}
              </div>
              <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                {item.price}
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-[#6b6868] mt-8">
              No items found
            </div>
          )}
        </div>
        
        <ProfileIcon onClick={() => navigateTo('profile')} />
      </div>
    </div>
  )
}
