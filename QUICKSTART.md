# SeniorCare - Quick Start Guide

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Application Flow

### For New Users:

1. **Home Page** (`/`) → Click "Login"
2. **Login Page** → Click "Sign up now"
3. **Signup Page** → Fill in details and create account
4. **Dashboard** → Access all features

### Main Features:

#### 💰 Wallet Tracker (`/wallet`)

- View total balance, income, and expenses
- Add new transactions
- Track spending by category
- Delete transactions

#### 🛒 Grocery Store (`/grocery`)

- Browse products by category
- Search for items
- Add to cart
- Manage cart quantities
- Checkout

#### 🎉 Community Events (`/events`)

- View available events
- See enrolled events
- Enroll/unenroll in events
- Add custom events

#### 💊 Medicine Reminders (`/medicine`)

- View all medications
- See upcoming reminders
- Add new medicines
- Set reminder times
- Delete medications

#### 👤 User Profile (`/profile`)

- Edit personal information
- Update emergency contacts
- Manage medical notes
- Logout

## 🎯 Key Features

### Accessibility

- ✅ Large fonts and buttons (44px minimum for touch)
- ✅ High contrast colors
- ✅ Clear visual hierarchy
- ✅ Screen reader friendly
- ✅ Keyboard navigation support

### Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop friendly
- ✅ Touch and click friendly

### User Experience

- ✅ Simple navigation
- ✅ Clear call-to-actions
- ✅ Helpful icons
- ✅ Loading states
- ✅ Error validation

## 🔧 Technical Details

### Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS 4
- **State:** React Hooks (useState, useRouter)

### Project Structure

```
src/app/
├── page.tsx              # Landing page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
├── login/page.tsx        # Login page
├── signup/page.tsx       # Signup page
├── forgot-password/page.tsx
├── dashboard/page.tsx    # Main dashboard
├── wallet/page.tsx       # Wallet tracker
├── grocery/page.tsx      # Grocery store
├── events/page.tsx       # Community events
├── medicine/page.tsx     # Medicine reminders
└── profile/page.tsx      # User profile
```

## 🎨 Design Patterns

### Color Scheme

- **Primary:** Indigo/Purple gradient
- **Wallet:** Green gradient
- **Grocery:** Orange/Amber gradient
- **Events:** Purple/Pink gradient
- **Medicine:** Blue/Teal gradient

### Component Patterns

- **Client Components:** All interactive pages use `"use client"`
- **Responsive Grids:** CSS Grid for layouts
- **Flexbox:** For component alignment
- **Modals:** For add/edit functionality

## 📝 Future Enhancements

1. **Firebase Integration**

   - Real-time data synchronization
   - User authentication
   - Cloud storage

2. **Notifications**

   - Push notifications for medicine
   - Event reminders
   - Expense alerts

3. **Social Features**

   - Family member access
   - Share events
   - Chat functionality

4. **Health Integration**
   - Fitness tracking
   - Health records
   - Doctor appointments

## 🐛 Known Issues

Currently, this is a front-end prototype with:

- Mock data (no backend)
- Local state only (no persistence)
- No actual authentication

## 💡 Tips for Development

1. **Hot Reload:** Save any file to see instant updates
2. **Console:** Check browser console for errors
3. **Responsive:** Use browser dev tools to test mobile views
4. **Accessibility:** Test with keyboard navigation

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Test responsive design
4. Ensure accessibility
5. Submit pull request

## 📞 Support

For issues or questions:

- Open a GitHub issue
- Check existing issues first
- Provide detailed description

---

**Happy Coding! 💙**
