import React from 'react'
import Image from 'next/image'
import imgImage6 from "@/assets/7d87c8971bb3af100a42ffd2b10a81f7835a88b9.png";


interface ProfileIconProps {
  onClick: () => void
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ onClick }) => {
  return (
    <button 
      className="absolute contents cursor-pointer left-[347px] top-[870px]"
      onClick={onClick}
    >
      <div className="absolute left-[351px] size-[70px] top-[870px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
          <circle cx="35" cy="35" fill="var(--fill-0, #D9D9D9)" id="Ellipse 5" r="35" />
        </svg>
      </div>
      <div className="absolute h-[49px] left-[347px] top-[880px] w-[78px]" data-name="image 6">
        <Image alt="Profile Icon" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} fill />
      </div>
    </button>
  )
}