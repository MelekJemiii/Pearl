"use client";
import React from 'react'
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Googlesigninbutton = () => {
    const router = useRouter("");
    const handlegoogle = async (e) => {
        e.preventDefault();
        try {
          await signIn('google', { redirect: true }); // NextAuth will handle the redirect
        } catch (error) {
          console.log('Error during Google sign-in:', error);
        }
      };
      
      
  return (
    <button onClick={handlegoogle} className='flex items-center gap-4 shadow-xl rounded-lg pl-3' >
    <Image src="/google_logo.png" height={40} width={40} alt='hi'  />
    <span className='bg-blue-500 text-white px-4 py-3'>Sign in with Google</span>
    
</button>
  )
}

export default Googlesigninbutton