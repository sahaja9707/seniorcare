# SeniorCare - Architecture & Implementation Guide

## Project Overview

SeniorCare is a comprehensive web application built with Next.js 15, designed to help senior citizens manage their daily tasks including finances, groceries, medications, and community events.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React

## Project Structure

```
seniorcare/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with AppProvider
│   │   ├── page.tsx             # Home/Landing page
│   │   ├── login/               # Login page
│   │   ├── signup/              # Signup page
│   │   ├── forgot-password/     # Password reset page
│   │   ├── dashboard/           # Main dashboard
│   │   ├── wallet/              # Wallet tracker
│   │   ├── medicine/            # Medicine reminder
│   │   ├── events/              # Community events
│   │   ├── grocery/             # Grocery store
│   │   └── profile/             # User profile
│   │
│   ├── src/                     # Shared source code
│   │   ├── lib/
│   │   │   ├── context/
│   │   │   │   └── AppContext.tsx    # Global state management
│   │   │   └── types/
│   │   │       └── index.ts          # TypeScript type definitions
│   │   │
│   │   └── components/
│   │       ├── ui/                   # Reusable UI components
│   │       │   ├── UserAvatar.tsx
│   │       │   ├── ProfileIcon.tsx
│   │       │   └── BackButton.tsx
│   │       │
│   │       └── modals/               # Modal components
│   │           ├── AddMedicineModal.tsx
│   │           ├── AddEventModal.tsx
│   │           ├── DeleteModal.tsx
│   │           └── LogoutModal.tsx
│   │
│   ├── components/ui/           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (other shadcn components)
│   │
│   ├── assets/                  # Image assets
│   │   └── *.png
│   │
│   └── lib/
│       └── utils.ts             # Utility functions (cn, etc.)
│
├── public/                      # Static assets
├── components.json              # shadcn/ui config
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.ts               # Next.js configuration
```

## Key Features

### 1. **Authentication Flow**

- Login page with username/password
- Signup page for new users
- Forgot password functionality
- Guest access to dashboard

### 2. **Dashboard**

- Welcome message with username
- Medicine reminders at the top
- Four main categories:
  - Wallet Tracker
  - Medicine Reminder
  - Grocery Store
  - Community Events
- Quick navigation to all sections
- Profile access icon

### 3. **Wallet Tracker**

- Display current balance
- Transaction history (placeholder)
- Easy navigation back to dashboard

### 4. **Medicine Reminder**

- List all medications with:
  - Medicine name
  - Frequency (times per day)
  - Next scheduled time
- Add new medicines via modal
- Delete medicines with confirmation
- Visual cards for each medicine

### 5. **Community Events**

- Highlighted upcoming event
- List of all registered events
- Add new events via modal
- Event details: name, date, time

### 6. **Grocery Store**

- List of grocery items
- Item names and prices
- Simple, easy-to-read interface

### 7. **User Profile**

- Display user information:
  - Full name
  - Date of birth
  - Email address
- Logout functionality with confirmation

## State Management

### AppContext (`src/src/lib/context/AppContext.tsx`)

The application uses React Context API for global state management:

```typescript
interface AppState {
  currentScreen: Screen;
  currentModal: Modal;
  medicines: Medicine[];
  events: Event[];
  groceryItems: GroceryItem[];
}
```

**Available Actions:**

- `navigateTo(screen)` - Navigate between screens
- `openModal(modal)` - Open modals
- `closeModal()` - Close active modal
- `handleLogin()` - Process login
- `handleLogout()` - Process logout
- `addMedicine(name, frequency, time)` - Add new medicine
- `deleteMedicine(id)` - Remove medicine
- `addEvent(name, date, time)` - Add new event

## Navigation System

The app uses a custom navigation system through the `AppContext`:

```typescript
// Navigate to different pages
navigateTo("dashboard");
navigateTo("wallet");
navigateTo("medicine");
navigateTo("events");
navigateTo("grocery");
navigateTo("profile");
navigateTo("login");
navigateTo("signup");
navigateTo("forgot-password");
```

## Modals

The application includes several modals for user interactions:

1. **AddMedicineModal** - Add new medicines
2. **AddEventModal** - Register for events
3. **DeleteModal** - Confirm deletions
4. **LogoutModal** - Confirm logout

All modals are controlled via the `AppContext`:

```typescript
openModal("addMedicine");
openModal("addEvent");
openModal("delete");
openModal("logout");
closeModal();
```

## Styling Approach

The app uses a combination of:

1. **Tailwind CSS** for utility-first styling
2. **Custom CSS variables** for theme colors
3. **Absolute positioning** for precise layout control (Figma-imported design)
4. **Responsive design** optimized for mobile (440px width)

### Key Colors

- Primary Dark: `#060a24`
- Background: `#f0ecec`
- Accent Gray: `#aca8a8`
- Accent Blue: `#d8e4ee`

## Image Handling

Images are imported using Next.js Image component for optimization:

```typescript
import Image from "next/image";
import imgAsset from "@/assets/filename.png";

<Image alt="Description" src={imgAsset} fill className="object-cover" />;
```

## Data Structures

### Medicine

```typescript
interface Medicine {
  id: string;
  name: string;
  frequency: string;
  nextTime: string;
}
```

### Event

```typescript
interface Event {
  id: string;
  name: string;
  time: string;
  date: string;
}
```

### GroceryItem

```typescript
interface GroceryItem {
  id: string;
  name: string;
  price: string;
}
```

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Key Implementation Details

### 1. Client Components

All pages and interactive components use `'use client'` directive for client-side rendering.

### 2. Context Provider

The `AppProvider` wraps all pages in `src/app/layout.tsx` to provide global state access.

### 3. Image Optimization

All images are properly imported and use Next.js Image component for automatic optimization.

### 4. Type Safety

Full TypeScript support with defined interfaces for all data structures.

### 5. Accessibility

- Proper alt text for images
- Semantic HTML structure
- Button elements for interactive elements
- Large, readable fonts (optimized for seniors)

## Future Enhancements

1. **Firebase Integration** - Real user authentication and data persistence
2. **Real-time Notifications** - Push notifications for medicine reminders
3. **Payment Integration** - Actual transaction processing in wallet
4. **Online Grocery Ordering** - Integration with local grocery stores
5. **Event RSVP System** - Proper event registration system
6. **Profile Editing** - Allow users to update their information
7. **Dark Mode** - Theme switching for better accessibility
8. **Multi-language Support** - Internationalization for wider accessibility

## Best Practices Followed

1. ✅ Component-based architecture
2. ✅ Separation of concerns (UI, logic, state)
3. ✅ Type safety with TypeScript
4. ✅ Reusable UI components
5. ✅ Centralized state management
6. ✅ Proper error handling (modals for confirmations)
7. ✅ Mobile-first design
8. ✅ Accessible UI for seniors (large text, simple navigation)
9. ✅ Image optimization
10. ✅ Clean code structure

## Troubleshooting

### Images not loading

Ensure all image paths use `@/assets/` prefix and images exist in `src/assets/`

### Context not working

Make sure `AppProvider` wraps your components in the layout

### Navigation issues

Use the `navigateTo` function from `useApp()` hook instead of Next.js router

### Build errors

Run `npm install` to ensure all dependencies are installed

## Contributing

When adding new features:

1. Update types in `src/src/lib/types/index.ts`
2. Add actions to `AppContext.tsx` if needed
3. Create components in appropriate directories
4. Follow existing styling patterns
5. Test on mobile viewport (440px)

---

Built with ❤️ for making seniors' lives easier.
