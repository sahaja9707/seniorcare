'use client'

import React, { useState, useEffect } from 'react'
import { useApp } from '@/src/lib/context/AppContext'
import { useAuth } from '@/lib/context/AuthContext'
import { useCart } from '@/lib/hooks/useCart'
import { searchProduct, getAllProducts } from '@/lib/hooks/useCart'
import { UserAvatar } from '@/src/components/ui/UserAvatar'
import { BackButton } from '@/src/components/ui/BackButton'
import { ProfileIcon } from '@/src/components/ui/ProfileIcon'

interface Product {
  id: string
  Product_Name: string
  Unit_Price: string
  Stock_Quantity: number
  Category?: string
}

export default function GroceryPage() {
  const { navigateTo } = useApp()
  const { user } = useAuth()
  const { cart, cartItemCount, addToCart, loading: cartLoading } = useCart(user?.uid)
  const [showCart, setShowCart] = useState(false)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingProduct, setAddingProduct] = useState<string | null>(null)

  // Load all products from Firebase on mount
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const allProducts = await getAllProducts()
      setProducts(allProducts as Product[])
    } catch (err) {
      console.error('Error loading products:', err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Filter items based on search query using BST search with partial key matching
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadProducts()
      return
    }

    try {
      setLoading(true)
      const results = await searchProduct(searchQuery)
      if (Array.isArray(results) && results.length > 0) {
        setProducts(results as Product[])
      } else {
        setProducts([])
      }
    } catch (err) {
      console.error('Error searching:', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Add product to cart
  const handleAddToCart = async (productName: string) => {
    if (!user) {
      alert('Please login to add items to cart')
      return
    }

    try {
      setAddingProduct(productName)
      const success = await addToCart(productName, 1)
      if (success) {
        alert(`${productName} added to cart!`)
      }
    } catch (err) {
      console.error('Error adding to cart:', err)
      alert('Failed to add to cart')
    } finally {
      setAddingProduct(null)
    }
  }

  const filteredItems = searchQuery 
    ? products 
    : products

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ecec]">
      <div className="relative h-[956px] w-[440px] overflow-clip bg-[#f0ecec]" data-name="grocery">
        <UserAvatar />
        <BackButton onBack={() => navigateTo('dashboard')} />
        {/* Header */}
        <div className="absolute left-[94px] top-[38px] flex items-center gap-2">
          <h1 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[36px] text-[#060a24] tracking-[0.72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Grocery
          </h1>
          {cartItemCount > 0 && (
            <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cartItemCount}
            </span>
          )}
          <button
            className="ml-4 bg-[#060a24] text-white px-4 py-1 rounded text-sm font-bold hover:bg-[#060a24]/90 transition-colors"
            onClick={() => setShowCart(true)}
            disabled={cart.length === 0}
          >
            View Cart
          </button>
        </div>

        {/* Search Bar with Search Button */}
        <div className="absolute left-[20px] top-[120px] w-[400px] flex gap-2">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 h-[50px] bg-[#aca8a8] rounded-[12px] pl-[28px] pr-[22px] font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-white placeholder-white/70 border-none outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-[80px] h-[50px] bg-[#060a24] rounded-[12px] text-white font-bold disabled:opacity-50"
          >
            {loading ? '...' : 'Search'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute left-[20px] top-[180px] w-[400px] bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}
        
        {/* Grocery Items from Firebase */}
        <div className="absolute left-[20px] top-[190px] w-[400px] h-[700px] overflow-y-auto flex flex-col gap-[14px] pr-2">
          {loading ? (
            <div className="text-center font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-[#6b6868] mt-8">
              Loading products...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-[#6b6868] mt-8">
              No items found
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-[rgba(213,206,206,0.4)] min-h-[80px] w-full rounded-[8px] flex items-center justify-between px-6 py-3">
                <div className="flex-1">
                  <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[22px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {item.Product_Name}
                  </div>
                  <div className="font-['Instrument_Sans:Regular',_sans-serif] text-[14px] text-gray-600">
                    Stock: {item.Stock_Quantity}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {item.Unit_Price}
                  </div>
                  <button
                    onClick={() => handleAddToCart(item.Product_Name)}
                    disabled={item.Stock_Quantity === 0 || addingProduct === item.Product_Name || !user}
                    className="bg-[#060a24] text-white px-4 py-1 rounded text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#060a24]/90 transition-colors"
                  >
                    {addingProduct === item.Product_Name ? 'Adding...' : item.Stock_Quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <ProfileIcon onClick={() => navigateTo('profile')} />

        {/* Cart Popup Modal */}
        {showCart && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-[14px] w-[340px] max-h-[400px] overflow-y-auto p-[22px] shadow-2xl">
              <h2 className="font-['Instrument_Sans:Bold',_sans-serif] font-bold text-[22px] text-[#060a24] mb-[16px]">Cart Items</h2>
              {Object.keys(cart).length === 0 ? (
                <div className="text-center text-[#6b6868] text-[16px]">Your cart is empty.</div>
              ) : (
                <ul className="flex flex-col gap-[12px]">
                  {Object.entries(cart).map(([productName, quantity]: [string, number], idx: number) => (
                    <li key={idx} className="bg-[#f0ecec] rounded-[10px] px-[20px] py-[14px] flex justify-between items-center border border-[#e5e5e5]">
                      <span className="font-['Instrument_Sans:Regular',_sans-serif] text-[18px] text-[#060a24]">{productName}</span>
                      <span className="font-['Instrument_Sans:Bold',_sans-serif] text-[24px] text-[#22c55e] pl-[10px]">x{quantity}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="w-full mt-[18px] h-[40px] bg-[#060a24] text-white rounded-[8px] font-['Instrument_Sans:Medium',_sans-serif] text-[15px] hover:bg-[#060a24]/90"
                onClick={() => setShowCart(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
