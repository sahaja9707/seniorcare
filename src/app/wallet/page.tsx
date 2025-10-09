'use client'

import React, { useState } from 'react'
import { useApp } from '@/src/lib/context/AppContext'
import { useAuth } from '@/lib/context/AuthContext'
import { useWallet } from '@/lib/hooks/useWallet'
import { formatTimestamp } from '@/lib/hooks/useWallet'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'

export default function WalletPage() {
  const { navigateTo } = useApp()
  const { user } = useAuth()
  const {
    balance,
    transactions,
    loading,
    error,
    deposit,
    withdraw,
    // Stack-based DSA operations
    stackTransactions,
    undoLastTransaction,
    getTransactionSummary,
    transactionCount
  } = useWallet(user?.uid)
  
  const [amount, setAmount] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [showStackView, setShowStackView] = useState<boolean>(false)

  const handleDeposit = async () => {
    const numAmount = parseFloat(amount)
    if (numAmount > 0 && description.trim()) {
      const success = await deposit(numAmount, description)
      if (success) {
        setAmount('')
        setDescription('')
        setSuccessMessage('Money added successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    }
  }

  const handleWithdraw = async () => {
    const numAmount = parseFloat(amount)
    if (numAmount > 0 && description.trim()) {
      const success = await withdraw(numAmount, description)
      if (success) {
        setAmount('')
        setDescription('')
        setSuccessMessage('Money withdrawn successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    }
  }

  const handleUndo = () => {
    const undone = undoLastTransaction()
    if (undone) {
      setSuccessMessage(`Undone: ${undone.description} (${undone.type})`)
      setTimeout(() => setSuccessMessage(''), 3000)
    } else {
      setSuccessMessage('No transactions to undo')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const toggleStackView = () => {
    setShowStackView(!showStackView)
  }

  const formatDate = (timestamp: string) => {
    const d = new Date(timestamp)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatTime = (timestamp: string) => {
    const d = new Date(timestamp)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const latestTransaction = transactions[0]
  const summary = getTransactionSummary()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="wallet">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="absolute top-[80px] left-[20px] right-[20px] bg-green-100 text-green-700 p-3 rounded z-50 text-sm">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="absolute top-[80px] left-[20px] right-[20px] bg-red-100 text-red-700 p-3 rounded z-50 text-sm">
            {error}
          </div>
        )}

        {/* Balance Card */}
        <div className="absolute bg-[#060a24] font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold h-[180px] leading-[0] left-[20px] overflow-clip rounded-[12px] text-[31px] text-white top-[115px] tracking-[1.86px] w-[404px]">
          <div className="absolute flex flex-col h-[140px] justify-end leading-[normal] left-[33px] top-[157px] translate-y-[-100%] w-[356px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="mb-0 text-[20px] tracking-[1.2px]">BALANCE</p>
          </div>
          <div className="absolute flex flex-col h-[90px] justify-end left-[371px] text-right top-[98px] translate-x-[-100%] translate-y-[-100%] w-[300px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] text-[36px]">
              {loading ? 'Loading...' : `Rs ${balance.toFixed(2)}`}
            </p>
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
            disabled={!amount || !description || loading}
            className="w-full h-[65px] bg-[#060a24] rounded-[12px] font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[20px] text-white tracking-[1.2px] hover:bg-[#060a24]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {loading ? 'Processing...' : 'Withdraw Money'}
          </button>
        </div>

        {/* DSA Stack Operations - Info Badge */}
        <div className="absolute left-[20px] top-[780px] w-[404px]">
          <button
            onClick={toggleStackView}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <span className="font-semibold">📚 Stack DSA: {transactionCount} transactions</span>
            <span>{showStackView ? '▲' : '▼'}</span>
          </button>
          
          {showStackView && (
            <div className="mt-2 bg-white rounded-lg p-4 shadow-lg max-h-[120px] overflow-y-auto">
              <div className="text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-bold text-purple-600">LIFO Stack Operations</span>
                  <button
                    onClick={handleUndo}
                    disabled={transactionCount === 0}
                    className="text-xs bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ↶ Undo (Pop)
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Total Deposits:</span>
                    <span className="text-green-600 font-semibold">₹{summary.totalDeposits.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Withdrawals:</span>
                    <span className="text-red-600 font-semibold">₹{summary.totalWithdrawals.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Change:</span>
                    <span className={`font-semibold ${summary.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {summary.netChange >= 0 ? '+' : ''}₹{summary.netChange.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
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