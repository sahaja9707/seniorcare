'use client'

import React, { useState } from 'react'
import { useApp } from '@/src/lib/context/AppContext'
import { useAuth } from '@/lib/context/AuthContext'
import { useMedicine } from '@/lib/hooks/useMedicine'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'

export default function MedicinePage() {
  const { navigateTo } = useApp()
  const { user } = useAuth()
  const {
    medicines,
    nextReminder,
    loading,
    error,
    addMedicine,
    deleteMedicine,
    medicineCount
  } = useMedicine(user?.uid)
  
  // Form state
  const [showAddForm, setShowAddForm] = useState(false)
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [times, setTimes] = useState([''])
  const [expiryDate, setExpiryDate] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  // Delete confirmation state
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null)

  const handleAddMedicine = async () => {
    if (!name || !dosage || !frequency || times.length === 0) {
      alert('Please fill all required fields')
      return
    }

    const filteredTimes = times.filter(t => t.trim() !== '')
    if (filteredTimes.length === 0) {
      alert('Please add at least one reminder time')
      return
    }

    const success = await addMedicine(name, dosage, frequency, filteredTimes, expiryDate)
    if (success) {
      // Reset form
      setName('')
      setDosage('')
      setFrequency('')
      setTimes([''])
      setExpiryDate('')
      setShowAddForm(false)
      setSuccessMessage('Medicine added successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const handleDeleteMedicine = async (medicineId: string) => {
    const success = await deleteMedicine(medicineId)
    if (success) {
      setMedicineToDelete(null)
      setSuccessMessage('Medicine deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const addTimeField = () => {
    setTimes([...times, ''])
  }

  const updateTimeField = (index: number, value: string) => {
    const newTimes = [...times]
    newTimes[index] = value
    setTimes(newTimes)
  }

  const removeTimeField = (index: number) => {
    if (times.length > 1) {
      setTimes(times.filter((_, i) => i !== index))
    }
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="medicine">
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

        <UserAvatar />
        <BackButton onBack={() => navigateTo('dashboard')} />
        
        {/* Header */}
        <div className="absolute left-[94px] top-[38px]">
          <h1 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[36px] text-[#060a24] tracking-[0.72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Medicine ({medicineCount})
          </h1>
        </div>
        
        {/* Next Reminder Card - Priority Queue Peek */}
        {nextReminder && (
          <div className="absolute left-[20px] top-[110px] w-[400px] bg-[#4ade80] rounded-[12px] p-[16px]">
            <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[14px] text-[#060a24] tracking-[0.84px] mb-[8px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              🔔 NEXT REMINDER
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[20px] text-[#060a24]">
                  {nextReminder.medicineName}
                </p>
                <p className="font-['Instrument_Sans:Regular',_sans-serif] text-[14px] text-[#060a24]">
                  {nextReminder.dosage}
                </p>
              </div>
              <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[16px] text-[#060a24]">
                {nextReminder.timeUntil}
              </p>
            </div>
          </div>
        )}
        
        {/* Medicine Cards List - Using Priority Queue Data Structure */}
        <div className="absolute left-[20px] top-[210px] w-[400px] h-[530px] overflow-y-auto flex flex-col gap-[14px] pr-2">
          {loading && (
            <div className="text-center font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-[#6b6868] mt-8">
              Loading medicines...
            </div>
          )}
          
          {!loading && medicines.length === 0 && (
            <div className="text-center font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-[#6b6868] mt-8">
              No medicines added yet. Click "Add Medicine" to get started.
            </div>
          )}
          
          {!loading && medicines.map((medicine) => (
            <div key={medicine.id} className="bg-[#060a24] min-h-[110px] rounded-[12px] w-full px-[24px] py-[18px] relative">
              <div className="flex justify-between items-start">
                <div className="flex-1 flex flex-col gap-[8px]">
                  <div className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[22px] text-white leading-tight" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {medicine.name}
                  </div>
                  <div className="font-['Instrument_Sans:Regular',_sans-serif] text-[15px] text-[#aca8a8]">
                    {medicine.dosage} • {medicine.frequency}
                  </div>
                  <div className="font-['Instrument_Sans:Regular',_sans-serif] text-[14px] text-[#aca8a8]">
                    Times: {medicine.times.join(', ')}
                  </div>
                  {medicine.expiryDate && (
                    <div className="font-['Instrument_Sans:Regular',_sans-serif] text-[13px] text-[#f87171]">
                      Expires: {medicine.expiryDate}
                    </div>
                  )}
                </div>
                <button 
                  className="w-[34px] h-[34px] rounded-full bg-[#D9D9D9] flex items-center justify-center cursor-pointer hover:bg-[#c0c0c0] transition-colors flex-shrink-0"
                  onClick={() => setMedicineToDelete(medicine.id || null)}
                >
                  <span className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[18px] text-[#060a24]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    X
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Priority Queue DSA Indicator */}
        <div className="absolute left-[20px] top-[760px] w-[400px] bg-gradient-to-r from-purple-500 to-purple-600 rounded-[12px] px-[20px] py-[14px] shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              <div className="w-[36px] h-[36px] bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-[20px]">📊</span>
              </div>
              <div>
                <p className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[16px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Priority Queue DSA: {medicineCount} medicines
                </p>
                <p className="font-['Instrument_Sans:Regular',_sans-serif] text-[12px] text-white/80">
                  Min-Heap Operations
                </p>
              </div>
            </div>
            <div className="bg-white/20 rounded-[8px] px-[12px] py-[6px]">
              <p className="font-['Instrument_Sans:SemiBold',_sans-serif] font-semibold text-[14px] text-white">
                🔔 Active
              </p>
            </div>
          </div>
        </div>

        {/* Add Medicine Button */}
        <button 
          className="absolute bg-[#060a24] cursor-pointer h-[56px] right-[20px] rounded-[12px] top-[810px] w-[191px] hover:bg-[#060a24]/90 transition-colors disabled:opacity-50"
          onClick={() => setShowAddForm(true)}
          disabled={loading}
        >
          <div className="font-['Instrument_Sans:Medium',_sans-serif] font-medium text-[19px] text-white tracking-[0.76px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Add Medicine  +
          </div>
        </button>

        <ProfileIcon onClick={() => navigateTo('profile')} />

        {/* Add Medicine Modal */}
        {showAddForm && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
            <div className="bg-white rounded-[16px] w-[400px] max-h-[750px] overflow-y-auto p-[32px] shadow-2xl">
              <h2 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[28px] text-[#060a24] mb-[24px]">
                Add Medicine
              </h2>
              
              <div className="flex flex-col gap-[16px]">
                <div>
                  <label className="font-['Instrument_Sans:SemiBold',_sans-serif] text-[14px] text-[#6b6868] mb-[6px] block">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Aspirin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-[52px] bg-[#f0ecec] rounded-[10px] px-[18px] font-['Instrument_Sans:Regular',_sans-serif] text-[16px] text-[#060a24] border-2 border-transparent focus:border-[#060a24] outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="font-['Instrument_Sans:SemiBold',_sans-serif] text-[14px] text-[#6b6868] mb-[6px] block">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 500mg"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full h-[52px] bg-[#f0ecec] rounded-[10px] px-[18px] font-['Instrument_Sans:Regular',_sans-serif] text-[16px] text-[#060a24] border-2 border-transparent focus:border-[#060a24] outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="font-['Instrument_Sans:SemiBold',_sans-serif] text-[14px] text-[#6b6868] mb-[6px] block">
                    Frequency *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3x daily"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full h-[52px] bg-[#f0ecec] rounded-[10px] px-[18px] font-['Instrument_Sans:Regular',_sans-serif] text-[16px] text-[#060a24] border-2 border-transparent focus:border-[#060a24] outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="font-['Instrument_Sans:SemiBold',_sans-serif] text-[14px] text-[#6b6868] mb-[6px] block">
                    Reminder Times (HH:MM format) *
                  </label>
                  <div className="bg-[#f0ecec] rounded-[10px] p-[16px]">
                    {times.map((time, index) => (
                      <div key={index} className="flex gap-[10px] mb-[10px] last:mb-0">
                        <input
                          type="text"
                          placeholder="e.g., 09:00"
                          value={time}
                          onChange={(e) => updateTimeField(index, e.target.value)}
                          className="flex-1 h-[48px] bg-white rounded-[8px] px-[16px] font-['Instrument_Sans:Regular',_sans-serif] text-[16px] text-[#060a24] border-2 border-transparent focus:border-[#060a24] outline-none transition-colors"
                        />
                        {times.length > 1 && (
                          <button
                            onClick={() => removeTimeField(index)}
                            className="w-[48px] h-[48px] bg-red-500 rounded-[8px] text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addTimeField}
                      className="w-full h-[44px] bg-[#060a24] text-white rounded-[8px] font-['Instrument_Sans:Medium',_sans-serif] text-[15px] hover:bg-[#060a24]/90 transition-colors mt-[6px]"
                    >
                      + Add Time
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="font-['Instrument_Sans:SemiBold',_sans-serif] text-[14px] text-[#6b6868] mb-[6px] block">
                    Expiry Date (optional)
                  </label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full h-[52px] bg-[#f0ecec] rounded-[10px] px-[18px] font-['Instrument_Sans:Regular',_sans-serif] text-[16px] text-[#060a24] border-2 border-transparent focus:border-[#060a24] outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex gap-[14px] mt-[28px]">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 h-[52px] bg-[#aca8a8] text-white rounded-[10px] font-['Instrument_Sans:Medium',_sans-serif] text-[17px] hover:bg-[#9a9696] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMedicine}
                  disabled={loading}
                  className="flex-1 h-[52px] bg-[#060a24] text-white rounded-[10px] font-['Instrument_Sans:Medium',_sans-serif] text-[17px] hover:bg-[#060a24]/90 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {medicineToDelete && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[12px] w-[320px] p-[24px]">
              <h2 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[20px] text-[#060a24] mb-[16px]">
                Delete Medicine?
              </h2>
              <p className="font-['Instrument_Sans:Regular',_sans-serif] text-[16px] text-[#6b6868] mb-[20px]">
                Are you sure you want to delete this medicine? This action cannot be undone.
              </p>
              <div className="flex gap-[12px]">
                <button
                  onClick={() => setMedicineToDelete(null)}
                  className="flex-1 h-[48px] bg-[#aca8a8] text-white rounded-[8px] font-['Instrument_Sans:Medium',_sans-serif] hover:bg-[#9a9696]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => medicineToDelete && handleDeleteMedicine(medicineToDelete)}
                  disabled={loading}
                  className="flex-1 h-[48px] bg-red-500 text-white rounded-[8px] font-['Instrument_Sans:Medium',_sans-serif] hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
