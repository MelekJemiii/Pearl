"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar"; // Your sidebar component
import React from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function RootLayout({ children }) {
  const { data: session, status } = useSession();
  return (
    <SidebarProvider>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <AppSidebar user={session?.user} status={status}  />
          
        {/* Main content */}
        <main style={{ flex: 1, padding: "20px" }}>
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
