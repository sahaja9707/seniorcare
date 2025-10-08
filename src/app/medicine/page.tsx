'use client'

import React from 'react'
import { useApp } from '@/src/lib/context/AppContext'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'
import { AddMedicineModal } from '@/src/components/modals/AddMedicineModal'
import { DeleteModal } from '@/src/components/modals/DeleteModal'

export default function MedicinePage() {
  const { state, navigateTo, openModal } = useApp()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="medicine">
        <UserAvatar />
        <BackButton onBack={() => navigateTo('dashboard')} />
        
        {/* Header */}
        <div className="absolute left-[94px] top-[38px]">
          <h1 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[36px] text-[#060a24] tracking-[0.72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Medicine Tracker
          </h1>
        </div>
        
        {/* Medicine Cards - Using Queue/List Data Structure */}
        <div className="absolute left-[20px] top-[130px] w-[400px] flex flex-col gap-[20px]">
          {state.medicines.map((medicine) => (
            <div key={medicine.id} className="bg-[#060a24] h-[110px] rounded-[12px] w-full px-[24px] py-[18px] relative">
              <div className="flex justify-between items-start h-full">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[26px] text-white leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {medicine.name}
                  </div>
                  <div className="font-['Instrument_Sans:Regular',_sans-serif] text-[17px] text-white tracking-[0.68px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    next @ {medicine.nextTime}
                  </div>
                </div>
                <div className="flex items-start gap-[12px] h-full">
                  <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[17px] text-white pt-[2px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {medicine.frequency}
                  </div>
                  <button 
                    className="w-[34px] h-[34px] rounded-full bg-[#D9D9D9] flex items-center justify-center cursor-pointer hover:bg-[#c0c0c0] transition-colors flex-shrink-0"
                    onClick={() => openModal('delete')}
                  >
                    <span className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[18px] text-[#060a24]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      X
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Medicine Button */}
        <button 
          className="absolute bg-[#060a24] cursor-pointer h-[56px] right-[20px] rounded-[12px] top-[780px] w-[191px] hover:bg-[#060a24]/90 transition-colors"
          onClick={() => openModal('addMedicine')}
        >
          <div className="font-['Instrument_Sans:Medium',_sans-serif] font-medium text-[19px] text-white tracking-[0.76px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Add medicine  +
          </div>
        </button>

        <ProfileIcon onClick={() => navigateTo('profile')} />

        {/* Modals */}
        {state.currentModal === 'addMedicine' && <AddMedicineModal />}
        {state.currentModal === 'delete' && <DeleteModal />}
      </div>
    </div>
  )
}
