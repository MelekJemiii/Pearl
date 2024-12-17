import UserInfo from '@/components/UserInfo'
import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async () => {
    const session = await getServerSession(authOptions);
  
   if (session.user.email === "admin@admin.com") {
          redirect ("/admindashboard");
        }
  return (
    <UserInfo/>
  )
}

export default Dashboard