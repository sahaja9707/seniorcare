'use client';

import { AppProvider } from "@/lib/context/AppContext";
import { AuthProvider } from "@/lib/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </AuthProvider>
  );
}