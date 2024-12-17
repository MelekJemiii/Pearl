"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
const RegisterForm = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const router= useRouter();
    const handlesubmit = async (e) =>{
        e.preventDefault();
        if(!name || !email || !password)
        {
            setError("all fields are necessary !!");
            return ;
        }
        try {
            const resUserexists=await fetch('api/userExists',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({email}),
            });

            const {user} = await resUserexists.json();
            if(user){
                setError("User already Exists ! ");
                return;
            }
          const res=   await fetch("api/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    name,email,password
                }),
            });
            if(res.ok)
            {
                const form= e.target;
                setError("");
                router.push("/Login");
                form.reset();

            }else{
                console.log("user registration failed");
            }
        } catch (error) {
            console.log("Error registration ");
            
        }

    } ;
  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-blue-400'>
            <h1 className='text-xl font-bold my-4'>Register</h1>
            <form onSubmit={handlesubmit} className='flex flex-col gap-3'>
                <input onChange={(e)=>setName(e.target.value)}  type="text" placeholder='Full Name' />
                <input  onChange={(e)=>setEmail(e.target.value)}  type="text" placeholder='Email' />
                <input onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Password' />
                <button className='bg-blue-600 text-white font-bold cursor-pointer px-6 py-2'>Register</button>
            {error && 

              (  <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {error } 
                </div>)

            }

                <Link className='text-sm mt-3 text-right' href={'/'}>
                    Already have an account
                    <span className='underline' >Login</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm