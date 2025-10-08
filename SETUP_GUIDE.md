# SeniorCare - Quick Setup & Usage Guide

## ✅ Setup Complete

Your SeniorCare application is now fully configured and ready to use!

## 🚀 Getting Started

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure Overview

```
Key Directories:
- src/app/              → All page routes (Next.js App Router)
- src/src/components/   → Reusable components (UI, modals)
- src/src/lib/context/  → Global state management
- src/assets/           → Images and assets
- src/components/ui/    → shadcn/ui components
```

## 🔗 Navigation Routes

| Route              | Description                           |
| ------------------ | ------------------------------------- |
| `/`                | Landing page with Login/Guest options |
| `/login`           | User login page                       |
| `/signup`          | New user registration                 |
| `/forgot-password` | Password reset                        |
| `/dashboard`       | Main dashboard (home after login)     |
| `/wallet`          | Wallet tracker                        |
| `/medicine`        | Medicine reminder                     |
| `/events`          | Community events                      |
| `/grocery`         | Grocery store                         |
| `/profile`         | User profile                          |

## 🎯 Key Components

### Pages (Client Components)

All pages are in `src/app/[route]/page.tsx`

### Shared Components

Located in `src/src/components/`:

- **UI Components**: `ui/UserAvatar.tsx`, `ui/ProfileIcon.tsx`, `ui/BackButton.tsx`
- **Modals**: `modals/AddMedicineModal.tsx`, `modals/AddEventModal.tsx`, etc.

### Global State

`src/src/lib/context/AppContext.tsx` - Manages:

- Navigation between pages
- Modal state
- Medicines, events, grocery items
- User authentication state

## 💡 Usage Examples

### Using Navigation

```tsx
import { useApp } from "@/src/lib/context/AppContext";

function MyComponent() {
  const { navigateTo } = useApp();

  return (
    <button onClick={() => navigateTo("dashboard")}>Go to Dashboard</button>
  );
}
```

### Opening Modals

```tsx
import { useApp } from "@/src/lib/context/AppContext";

function MyComponent() {
  const { openModal } = useApp();

  return <button onClick={() => openModal("addMedicine")}>Add Medicine</button>;
}
```

### Accessing State

```tsx
import { useApp } from "@/src/lib/context/AppContext";

function MyComponent() {
  const { state } = useApp();

  return (
    <div>
      {state.medicines.map((medicine) => (
        <div key={medicine.id}>{medicine.name}</div>
      ))}
    </div>
  );
}
```

## 🎨 Styling

The project uses:

- **Tailwind CSS** for utility classes
- **Custom fonts**: Instrument Sans, Inria Sans
- **Color scheme**:
  - Primary: `#060a24` (dark navy)
  - Background: `#f0ecec` (light gray)
  - Accent: `#aca8a8` (medium gray)

## ✨ Features Implemented

✅ Complete authentication flow (Login, Signup, Forgot Password)
✅ Dashboard with 4 main sections
✅ Medicine tracker with add/delete functionality
✅ Community events with registration
✅ Grocery store listing
✅ Wallet tracker
✅ User profile with logout
✅ Modal system for confirmations
✅ Image optimization with Next.js Image
✅ Global state management with Context API
✅ TypeScript for type safety
✅ Mobile-optimized design (440px viewport)

## 🔧 Common Tasks

### Add a New Page

1. Create `src/app/[route]/page.tsx`
2. Add route to navigation system in AppContext
3. Update types if needed

### Add a New Modal

1. Create component in `src/src/components/modals/`
2. Add modal type to `src/src/lib/types/index.ts`
3. Update AppContext to handle modal state

### Add New State

1. Update `AppState` interface in types
2. Add to initial state in AppContext
3. Create actions/handlers as needed

## 📝 Important Notes

1. **All pages are client components** - Use `'use client'` directive
2. **Images use Next.js Image component** - Imported from `@/assets/`
3. **Navigation uses context, not Next.js router** - Use `navigateTo()` function
4. **State is managed globally** - Access via `useApp()` hook
5. **Mobile-first design** - Optimized for 440px width

## 🐛 Troubleshooting

### Issue: "Cannot find module '@/src/...'"

**Solution**: Check tsconfig.json paths configuration

### Issue: Images not displaying

**Solution**: Ensure images are in `src/assets/` and imported correctly

### Issue: Context not available

**Solution**: Make sure AppProvider wraps your component in layout.tsx

### Issue: Navigation not working

**Solution**: Use `navigateTo()` from useApp(), not Next.js Link for internal state

## 📚 Next Steps

To further develop the application:

1. **Add Firebase integration** for real authentication
2. **Implement real data persistence** (currently using local state)
3. **Add form validation** for inputs
4. **Enhance accessibility** features
5. **Add responsive design** for larger screens
6. **Implement actual payment** processing for wallet
7. **Connect to grocery APIs** for real product data
8. **Add push notifications** for medicine reminders

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Context API](https://react.dev/reference/react/useContext)
- [TypeScript](https://www.typescriptlang.org/docs)

---

**Your app is ready! Run `npm run dev` to start developing! 🚀**
