'use client'

import React, { useState } from 'react'
import { useApp } from '@/lib/context/AppContext'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'

interface AddEventModalProps {
  refreshEvents?: () => void
}

export const AddEventModal: React.FC<AddEventModalProps> = ({ refreshEvents }) => {
  const { closeModal } = useApp()
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!eventName || !eventDate || !eventTime) {
      alert('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const eventsRef = collection(db, 'events')
      await addDoc(eventsRef, {
        name: eventName,
        date: eventDate,
        time: eventTime,
        createdAt: Timestamp.now()
      })
      
      // Refresh the events list
      if (refreshEvents) {
        refreshEvents()
      }
      
      // Close the modal
      closeModal()
      
      // Reset form
      setEventName('')
      setEventDate('')
      setEventTime('')
    } catch (error) {
      console.error('Error adding event:', error)
      alert('Failed to add event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="absolute bg-[#aca8a8] h-[387px] left-[21px] overflow-clip rounded-[12px] top-[284px] w-[398px] z-50" data-name="add event">
      <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[44px] justify-end leading-[0] left-[198.5px] text-[20px] text-black text-center top-[77px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-100%] w-[321px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Enter details of the event</p>
      </div>
      <input 
        className="absolute bg-[#bd4444] h-[47px] left-[49px] rounded-[8px] top-[104px] w-[309px] px-3 text-white placeholder-white"
        placeholder="Enter the name of the event"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input 
        className="absolute bg-[#bd4444] h-[47px] left-[50px] rounded-[8px] top-[174px] w-[309px] px-3 text-white placeholder-white"
        placeholder="Enter the date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <input 
        className="absolute bg-[#bd4444] h-[47px] left-[49px] rounded-[8px] top-[244px] w-[309px] px-3 text-white placeholder-white"
        placeholder="Enter the time"
        value={eventTime}
        onChange={(e) => setEventTime(e.target.value)}
      />
      <button 
        className="absolute bg-[#bd4444] h-[30px] left-[278px] rounded-[8px] top-[330px] w-[80px] cursor-pointer disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        <div className="absolute flex flex-col font-['Instrument_Sans:Bold',_sans-serif] font-bold h-[26px] justify-end leading-[0] left-[18px] text-[20px] text-white top-[27px] tracking-[-0.2px] translate-y-[-100%] w-[53px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal]">{loading ? 'ADDING...' : 'ADD'}</p>
        </div>
      </button>
    </div>
  )
}