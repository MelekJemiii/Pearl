"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Googlesigninbutton from './googlesigninbutton';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@radix-ui/react-dropdown-menu';


export function RegForm() {
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
    <Card className="w-[350px]">
          <form onSubmit={handlesubmit}>
      <CardHeader>
        <CardTitle>Enter your details</CardTitle>
        <CardDescription><Separator/></CardDescription>
      </CardHeader>
      <CardContent>
      
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="fullname">Full Name</Label>
              <Input id="fullname" onChange={(e)=>setName(e.target.value)} placeholder="Enter your Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="email">Email</Label>
              <Input id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your E-mail" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="password">Password</Label>
              <Input id="password" onChange={(e)=>setPassword(e.target.value)} type="password" />
            </div>
          
          </div>
    
      </CardContent>
      <CardFooter className="flex justify-between">
      { error && 
              (  <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {error} 
                </div>)
                }
        <Button  type='submit' >Register</Button>
      </CardFooter>
      </form>
    </Card>
  )
}
