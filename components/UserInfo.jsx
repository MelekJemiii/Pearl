"use client";
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
const UserInfo = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }



  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
      <Image
          className="rounded-full"
          src={session?.user?.image}
          width={60}
          height={60}
        />
        <div>
          Name: <span className="font-bold">{session.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session.user?.email}</span>
        </div>
        {session.user?.image && (
          <img src={session.user?.image} alt="User Avatar" className="w-16 h-16 rounded-full mt-2" />
        )}
        <button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
