"use client";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handlepush = () =>{
    router.push("/Login");
  }
  return (
    
      <div>
        <button onClick={handlepush} >Login</button>
      </div>

  );
}
