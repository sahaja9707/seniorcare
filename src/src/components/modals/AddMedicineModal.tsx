import React, { useState } from 'react'
import { useApp } from '../../lib/context/AppContext'

export const AddMedicineModal: React.FC = () => {
  const { addMedicine } = useApp()
  const [medicineName, setMedicineName] = useState('')
  const [frequency, setFrequency] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = () => {
    if (medicineName && frequency && time) {
      addMedicine(medicineName, frequency, time)
      setMedicineName('')
      setFrequency('')
      setTime('')
    }
  }

  return (
    <div className="absolute bg-[#aca8a8] h-[387px] left-[21px] overflow-clip rounded-[12px] top-[284px] w-[398px] z-50" data-name="add medicine">
      <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[44px] justify-end leading-[0] left-[198.5px] text-[20px] text-black text-center top-[77px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-100%] w-[321px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Enter details of the medicine</p>
      </div>
      <input 
        className="absolute bg-[#bd4444] h-[47px] left-[49px] rounded-[8px] top-[104px] w-[309px] px-3 text-white placeholder-white"
        placeholder="Enter the name of the medicine"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
      />
      <input 
        className="absolute bg-[#bd4444] h-[47px] left-[49px] rounded-[8px] top-[170px] w-[309px] px-3 text-white placeholder-white"
        placeholder="Enter the frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
      <input 
        className="absolute bg-[#bd4444] h-[47px] left-[49px] rounded-[8px] top-[244px] w-[309px] px-3 text-white placeholder-white"
        placeholder="Enter the time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button 
        className="absolute bg-[#bd4444] h-[30px] left-[278px] rounded-[8px] top-[330px] w-[80px] cursor-pointer"
        onClick={handleSubmit}
      >
        <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[26px] justify-end leading-[0] left-[18px] text-[20px] text-white top-[27px] tracking-[-0.2px] translate-y-[-100%] w-[53px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">ADD</p>
        </div>
      </button>
    </div>
  )
}