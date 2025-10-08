'use client'

import React, { useState } from 'react'
import { useApp } from '@/src/lib/context/AppContext'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'

export default function WalletPage() {
  const { navigateTo, state, depositMoney, withdrawMoney, undoLastTransaction } = useApp()
  const [amount, setAmount] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleDeposit = () => {
    const numAmount = parseFloat(amount)
    if (numAmount > 0 && description.trim()) {
      depositMoney(numAmount, description)
      setAmount('')
      setDescription('')
    }
  }

  const handleWithdraw = () => {
    const numAmount = parseFloat(amount)
    if (numAmount > 0 && description.trim()) {
      withdrawMoney(numAmount, description)
      setAmount('')
      setDescription('')
    }
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatTime = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const latestTransaction = state.transactions[0]

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="wallet">
        {/* Balance Card */}
        <div className="absolute bg-[#060a24] font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[180px] leading-[0] left-[20px] overflow-clip rounded-[12px] text-[31px] text-white top-[115px] tracking-[1.86px] w-[404px]">
          <div className="absolute flex flex-col h-[140px] justify-end leading-[normal] left-[33px] top-[157px] translate-y-[-100%] w-[356px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="mb-0 text-[20px] tracking-[1.2px]">BALANCE</p>
          </div>
          <div className="absolute flex flex-col h-[90px] justify-end left-[371px] text-right top-[98px] translate-x-[-100%] translate-y-[-100%] w-[300px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] text-[36px]">Rs {state.walletBalance.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Latest Transaction Card - UPDATED PADDING */}
        {latestTransaction && (
          <div className="absolute bg-[#060a24] h-[130px] left-[20px] rounded-[12px] top-[315px] w-[404px]">
                <div className="pl-[40px] pr-[25px] py-[20px]">
              <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[14px] text-white tracking-[0.84px] mb-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                RECENT TRANSACTION
              </p>
              <div className="flex justify-between items-start gap-[16px]">
                <div className="flex-1 min-w-0">{/* Added ml-6 for more right shift */}
                  <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-white tracking-[0.8px] mb-[6px] leading-tight">
                    {latestTransaction.description}
                  </p>
                  <p className="font-['Instrument_Sans:Regular',_sans-serif] text-[14px] text-[#aca8a8] tracking-[0.56px]">
                    {formatDate(latestTransaction.timestamp)} at {formatTime(latestTransaction.timestamp)}
                  </p>
                </div>
                <p className={`font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[24px] tracking-[0.96px] whitespace-nowrap flex-shrink-0 ${latestTransaction.type === 'deposit' ? 'text-[#4ade80]' : 'text-[#f87171]'}`} style={{ fontVariationSettings: "'wdth' 100" }}>
                  {latestTransaction.type === 'deposit' ? '+' : '-'}Rs {latestTransaction.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Input Fields - UPDATED PADDING */}
        <div className="absolute left-[20px] top-[470px] w-[404px] flex flex-col gap-[10px]">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-[52px] bg-[#aca8a8] rounded-[12px] pl-[38px] pr-[22px] font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-white placeholder-white/70 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[52px] bg-[#aca8a8] rounded-[12px] pl-[38px] pr-[22px] font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-white placeholder-white/70 border-none outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="absolute left-[20px] top-[610px] w-[404px] flex flex-col gap-[20px]">
          <button
            onClick={handleDeposit}
            disabled={!amount || !description}
            className="w-full h-[65px] bg-[#060a24] rounded-[12px] font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-white tracking-[1.2px] hover:bg-[#060a24]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Add Money
          </button>
          
          <button
            onClick={handleWithdraw}
            disabled={!amount || !description}
            className="w-full h-[65px] bg-[#060a24] rounded-[12px] font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-white tracking-[1.2px] hover:bg-[#060a24]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Withdraw Money
          </button>
          
          <button
            onClick={undoLastTransaction}
            disabled={state.transactions.length === 0}
            className="w-full h-[65px] bg-white border-2 border-[#060a24] rounded-[12px] font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-[#060a24] tracking-[1.2px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Undo Last Transaction
          </button>
        </div>
        
        <BackButton onBack={() => navigateTo('dashboard')} />
        <UserAvatar />
        <p className="absolute font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[45px] leading-[normal] left-[94px] text-[#060a24] text-[36px] top-[38px] tracking-[0.72px] w-[274px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Wallet
        </p>
        <ProfileIcon onClick={() => navigateTo('profile')} />
      </div>
    </div>
  )
}