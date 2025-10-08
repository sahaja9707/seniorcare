import React from 'react'
import { useApp } from '../../lib/context/AppContext'
import imgImage1 from "figma:asset/adf34d48bf7a198a375097795321c7f10f36f03c.png"

export const LoginScreen: React.FC = () => {
  const { handleLogin } = useApp()

  return (
    <div className="absolute bg-[#f0ecec] h-[956px] left-0 overflow-auto top-0 w-[440px]" data-name="Login Page">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.008486481383442879)+(var(--transform-inner-height)*0.9999639987945557)))] items-center justify-center left-[calc(50%+0.231px)] mix-blend-multiply top-[calc(50%-294px)] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*0.008486481383442879)+(var(--transform-inner-width)*0.9999639987945557)))]" style={{ "--transform-inner-width": "432", "--transform-inner-height": "15" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.514deg]">
          <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[15px] leading-[normal] relative text-[#060a24] text-[44px] text-center tracking-[2.64px] w-[432.351px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            SENIOR CARE
          </p>
        </div>
      </div>
      <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[371px] w-[309px]" />
      <div className="absolute bg-[#aca8a8] h-[50px] left-[65px] rounded-[20px] top-[458px] w-[309px]" />
      <button 
        className="absolute bg-[#060a24] h-[48px] left-[78px] rounded-[44px] top-[538px] w-[273px] cursor-pointer"
        onClick={handleLogin}
      />
      <div className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[194px] text-[17px] text-black text-center top-[312px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`Welcome back! Please login. `}</p>
        <p>&nbsp;</p>
      </div>
      <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[123px] text-[17px] text-black text-center top-[351px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Username
      </p>
      <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[29px] leading-[normal] left-[123px] text-[17px] text-black text-center top-[437px] tracking-[1.02px] translate-x-[-50%] w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Password
      </p>
      <div className="absolute left-[190px] size-[66px] top-[116px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
          <circle cx="33" cy="33" fill="var(--fill-0, #D8E4EE)" id="Ellipse 1" r="33" />
        </svg>
      </div>
      <div className="absolute h-[46px] left-[189px] top-[126px] w-[69px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1.src} />
      </div>
      <p className="absolute font-['Inria_Sans:Regular',_sans-serif] h-[19px] leading-[normal] left-[170px] not-italic text-[20px] text-center text-white top-[386px] tracking-[-0.2px] translate-x-[-50%] w-[184px]">{` enter your username`}</p>
      <p className="absolute font-['Inria_Sans:Regular',_sans-serif] h-[19px] leading-[normal] left-[170px] not-italic text-[20px] text-center text-white top-[473px] tracking-[-0.2px] translate-x-[-50%] w-[184px]">{` enter your password`}</p>
      <p className="absolute font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[14px] leading-[normal] left-[214.5px] text-[#ece5e5] text-[17px] text-center top-[553px] tracking-[1.02px] translate-x-[-50%] w-[135px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Login
      </p>
    </div>
  )
}