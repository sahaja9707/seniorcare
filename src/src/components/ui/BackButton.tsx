import React from 'react'
import svgPaths from "../../../imports/svg-isorm1q19s"

interface BackButtonProps {
  onBack: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button 
      className="absolute contents cursor-pointer left-[25px] top-[897px]"
      onClick={onBack}
    >
      <div className="absolute left-[25px] size-[37px] top-[897px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 37">
          <circle cx="18.5" cy="18.5" fill="var(--fill-0, #D8E4EE)" id="Ellipse 2" r="18.5" />
        </svg>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[30px] top-[916px] w-[28px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[28px]">
            <div className="absolute bottom-[-7.36px] left-0 right-[-3.57%] top-[-7.36px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 16">
                <path d={svgPaths.p24316c00} fill="var(--stroke-0, #060A24)" id="Arrow 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}