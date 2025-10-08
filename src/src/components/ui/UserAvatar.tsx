import React from 'react'
import Image from 'next/image'
import imgImage1 from "@/assets/adf34d48bf7a198a375097795321c7f10f36f03c.png";


export const UserAvatar: React.FC = () => {
  return (
    <div className="absolute contents left-[20px] top-[27px]">
      <div className="absolute left-[22px] size-[66px] top-[27px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 66">
          <circle cx="33" cy="33" fill="var(--fill-0, #D8E4EE)" id="Ellipse 1" r="33" />
        </svg>
      </div>
      <div className="absolute h-[46px] left-[20px] top-[37px] w-[69px]" data-name="image 1">
        <Image alt="User Avatar" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} fill />
      </div>
    </div>
  )
}