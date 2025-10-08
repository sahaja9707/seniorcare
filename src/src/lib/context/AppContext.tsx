'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AppState, Screen, Modal, Medicine, Event, Transaction } from '../types'

interface AppContextType {
  state: AppState
  navigateTo: (screen: Screen) => void
  openModal: (modal: Modal) => void
  closeModal: () => void
  handleLogin: () => void
  handleLogout: () => void
  deleteMedicine: (id: string) => void
  addMedicine: (name: string, frequency: string, time: string) => void
  addEvent: (name: string, date: string, time: string) => void
  depositMoney: (amount: number, description: string) => void
  withdrawMoney: (amount: number, description: string) => void
  undoLastTransaction: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const router = useRouter()
  const [state, setState] = useState<AppState>({
    currentScreen: 'login',
    currentModal: 'none',
    medicines: [
      { id: '1', name: 'Cetrazine', frequency: '3 times a day', nextTime: '11:00 AM' },
      { id: '2', name: 'Cetrazine', frequency: '3 times a day', nextTime: '11:00 AM' },
      { id: '3', name: 'Cetrazine', frequency: '3 times a day', nextTime: '11:00 AM' },
    ],
    events: [
      { id: '1', name: 'Book Club Meeting', time: '4:00PM', date: 'Today' },
      { id: '2', name: 'Residence Association Meeting', time: '5:30 PM', date: 'Tuesday' },
      { id: '3', name: 'Residence Association Meeting', time: '5:30 PM', date: 'Tuesday' },
    ],
    groceryItems: [
      { id: '1', name: 'Milk', price: 'Rs 50/L' },
      { id: '2', name: 'Eggs', price: 'Rs 10/p' },
      { id: '3', name: 'Tea Powder (250gm)', price: 'Rs 150' },
      { id: '4', name: 'Apple', price: 'Rs 250/kg' },
      { id: '5', name: 'Banana', price: 'Rs 50/kg' },
    ],
    walletBalance: 13684.97,
    transactions: [
      {
        id: '1',
        type: 'deposit',
        amount: 5000,
        timestamp: new Date('2025-10-05T10:30:00'),
        description: 'Monthly Pension'
      },
      {
        id: '2',
        type: 'withdraw',
        amount: 1200,
        timestamp: new Date('2025-10-06T14:20:00'),
        description: 'Grocery Shopping'
      }
    ]
  })

  const navigateTo = (screen: Screen) => {
    setState(prev => ({ ...prev, currentScreen: screen, currentModal: 'none' }))
    // Actually navigate to the route
    router.push(`/${screen}`)
  }

  const openModal = (modal: Modal) => {
    setState(prev => ({ ...prev, currentModal: modal }))
  }

  const closeModal = () => {
    setState(prev => ({ ...prev, currentModal: 'none' }))
  }

  const handleLogin = () => {
    setState(prev => ({ ...prev, currentScreen: 'dashboard' }))
    router.push('/dashboard')
  }

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentScreen: 'login', currentModal: 'none' }))
    router.push('/login')
  }

  const deleteMedicine = (id: string) => {
    setState(prev => ({
      ...prev,
      medicines: prev.medicines.filter(m => m.id !== id),
      currentModal: 'none'
    }))
  }

  const addMedicine = (name: string, frequency: string, time: string) => {
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name,
      frequency,
      nextTime: time
    }
    setState(prev => ({
      ...prev,
      medicines: [...prev.medicines, newMedicine],
      currentModal: 'none'
    }))
  }

  const addEvent = (name: string, date: string, time: string) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      name,
      date,
      time
    }
    setState(prev => ({
      ...prev,
      events: [...prev.events, newEvent],
      currentModal: 'none'
    }))
  }

  const depositMoney = (amount: number, description: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount,
      timestamp: new Date(),
      description
    }
    setState(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
      transactions: [newTransaction, ...prev.transactions]
    }))
  }

  const withdrawMoney = (amount: number, description: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdraw',
      amount,
      timestamp: new Date(),
      description
    }
    setState(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - amount,
      transactions: [newTransaction, ...prev.transactions]
    }))
  }

  const undoLastTransaction = () => {
    setState(prev => {
      if (prev.transactions.length === 0) return prev
      
      const lastTransaction = prev.transactions[0]
      const newBalance = lastTransaction.type === 'deposit'
        ? prev.walletBalance - lastTransaction.amount
        : prev.walletBalance + lastTransaction.amount
      
      return {
        ...prev,
        walletBalance: newBalance,
        transactions: prev.transactions.slice(1)
      }
    })
  }

  const value: AppContextType = {
    state,
    navigateTo,
    openModal,
    closeModal,
    handleLogin,
    handleLogout,
    deleteMedicine,
    addMedicine,
    addEvent,
    depositMoney,
    withdrawMoney,
    undoLastTransaction,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}