# SeniorCare - Your Daily Life Companion

A comprehensive web application designed to make everyday social and personal tasks easier for senior citizens.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)

## 📋 Project Overview

SeniorCare is a user-friendly web application that helps senior citizens manage key aspects of their daily lives in one convenient place. As people age, managing finances, daily essentials, health routines, and social engagement can become challenging. Our app provides a simple, accessible interface designed specifically for elderly users.

### Key Features

- **💰 Wallet Tracker** - Monitor and manage expenses with ease
- **🛒 Grocery Store** - Order essentials online with a simple interface
- **🎉 Community Events** - Discover and enroll in local activities
- **💊 Medicine Reminder** - Never miss a medication with timely reminders
- **👤 User Profile** - Manage personal information and emergency contacts

## 🎯 Motivation

The motivation behind SeniorCare stems from the growing need to support the aging population through accessible technology. Many senior citizens face difficulties in:

- Shopping for essentials
- Managing finances and expenses
- Remembering medication schedules
- Staying connected with their community

While separate apps exist for these needs, most are either too complex or lack inclusivity for older users. SeniorCare provides an all-in-one, easy-to-navigate platform that promotes independence and enhances quality of life.

## 🏗️ Tech Stack

- **Framework:** Next.js 15.5.4 (App Router)
- **UI Library:** React 19.1.0
- **Styling:** TailwindCSS 4.0
- **Language:** TypeScript 5
- **Backend (Planned):** Firebase

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/seniorcare.git
cd seniorcare
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages & Routes

- `/` - Landing page
- `/login` - User authentication
- `/signup` - New user registration
- `/forgot-password` - Password recovery
- `/dashboard` - Main dashboard with quick access to all features
- `/wallet` - Expense tracking and management
- `/grocery` - Online grocery shopping
- `/events` - Community events and activities
- `/medicine` - Medication reminders
- `/profile` - User profile management

## 🎨 Design Principles

### Accessibility First

- Large, readable fonts
- High contrast colors
- Touch-friendly buttons (44px minimum)
- Clear visual hierarchy
- Screen reader compatible

### Responsive Design

- Mobile-first approach
- Optimized for tablets and desktops
- Flexible layouts that adapt to any screen size

### Senior-Friendly UX

- Simple navigation
- Minimal cognitive load
- Clear call-to-action buttons
- Helpful visual cues and icons
- Forgiving error handling

## 🗂️ Data Structures Used

The application leverages various data structures for optimal performance:

- **Arrays & Lists** - Store transactions, medications, events, and products
- **Hash Maps** - Quick lookup of user data and product information
- **State Management** - React hooks for efficient component state
- **Local Storage** - Persist user preferences (Firebase integration planned)

## 🔐 Security Features

- Password validation and strength requirements
- Email verification (planned)
- Secure authentication flow
- Emergency contact information protection
- Private user data handling

## 🚧 Upcoming Features

- [ ] Firebase integration for real-time data
- [ ] Push notifications for medicine reminders
- [ ] Voice commands for accessibility
- [ ] Family member dashboard
- [ ] Prescription refill reminders
- [ ] Integration with local pharmacies
- [ ] Video call feature for remote consultations
- [ ] Activity tracking and health insights

## 📊 Project Structure

```
seniorcare/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── wallet/
│   │   ├── grocery/
│   │   ├── events/
│   │   ├── medicine/
│   │   ├── profile/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
├── public/
│   └── [assets]
└── ui/
    └── [design references]
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from senior-focused applications
- Icons from Heroicons
- Built with ❤️ for our senior community

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Making life easier for seniors, one click at a time.** 💙
