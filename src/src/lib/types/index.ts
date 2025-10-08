export type Screen = 'login' | 'dashboard' | 'wallet' | 'medicine' | 'events' | 'grocery' | 'profile' | 'signup' | 'forgot-password'
export type Modal = 'none' | 'logout' | 'delete' | 'addEvent' | 'addMedicine'

export interface Medicine {
  id: string
  name: string
  frequency: string
  nextTime: string
}

export interface Event {
  id: string
  name: string
  time: string
  date: string
}

export interface GroceryItem {
  id: string
  name: string
  price: string
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  timestamp: Date
  description: string
}

export interface AppState {
  currentScreen: Screen
  currentModal: Modal
  medicines: Medicine[]
  events: Event[]
  groceryItems: GroceryItem[]
  walletBalance: number
  transactions: Transaction[]
}