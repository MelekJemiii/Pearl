"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthProvider } from "../Provider";

export default function RootLayout({ children }) {
  const { data: session, status } = useSession();
  return (
    <AuthProvider>
      <SidebarProvider>
        <div style={{ display: "flex" }}>
          {/* Sidebar */}
          <AppSidebar user={session?.user} signOut={signOut} status={status} />

          {/* Main content */}
          <main style={{ flex: 1, padding: "20px" }}>
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
