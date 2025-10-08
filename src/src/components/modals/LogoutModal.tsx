import React from 'react'
import { useApp } from '../../lib/context/AppContext'

export const LogoutModal: React.FC = () => {
  const { handleLogout, closeModal } = useApp()

  return (
    <div className="absolute bg-[#aca8a8] h-[387px] left-[21px] overflow-clip rounded-[12px] top-[284px] w-[398px] z-50" data-name="logout confirmation">
      <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[44px] justify-end leading-[0] left-[197.5px] text-[20px] text-black text-center top-[130px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-100%] w-[321px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Are you sure to logout?</p>
      </div>
      <button 
        className="absolute bg-[#060a24] h-[47px] left-[49px] overflow-clip rounded-[8px] top-[170px] w-[309px] cursor-pointer"
        onClick={handleLogout}
      >
        <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[23px] justify-end leading-[0] left-[155px] text-[20px] text-center text-white top-[35px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-100%] w-[154px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">logout</p>
        </div>
      </button>
      <button 
        className="absolute bg-[#363a53] block cursor-pointer h-[47px] left-[49px] overflow-clip rounded-[8px] top-[255px] w-[309px]"
        onClick={closeModal}
      >
        <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[30px] justify-end leading-[0] left-[154.5px] text-[20px] text-center text-white top-[35px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-100%] w-[117px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">cancel</p>
        </div>
      </button>
    </div>
  )
}