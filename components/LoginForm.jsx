"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
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

export function LoginForm() {
  const { data: session, status } = useSession();
 
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [error,setError] = useState("");
        const router = useRouter();
          const handlegoogle = async (e) => {
                e.preventDefault();
                try {
                  await signIn('google', { redirect: true }); // NextAuth will handle the redirect
                } catch (error) {
                  console.log('Error during Google sign-in:', error);
                }
              };
              
        const handleSubmit = async (e) =>{
            e.preventDefault();
            try {
              const res =  await signIn('credentials',{
                    email,password,redirect:false,
                });
                if(res.error){
                    setError("Invalid credentials");
                    return ;
                }
            router.replace('/Login');
            } catch (error) {
                console.log('error');
            }
        };
        if (status === "authenticated" ) {
            if(session?.user?.email=="admin@admin.com"){
              router.replace("/admindashboard"); 
            }else{
              router.replace("/dashboard"); 
            }
        }
  return (
    <Card className="w-[350px]">
          <form onSubmit={handleSubmit}>
      <CardHeader>
          <CardTitle>Enter your details</CardTitle>
        <CardDescription>
          <Separator/>
        </CardDescription>
      </CardHeader>
      <CardContent>
      
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="email">Email</Label>
              <Input id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your E-mail" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="password">Password</Label>
              <Input id="password" onChange={(e)=>setPassword(e.target.value)} type="password"  placeholder="Enter your Password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="theme">Theme</Label>
              <Select>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="lite">Lite</SelectItem>
                  <SelectItem value="stone">Stone</SelectItem>
                  <SelectItem value="zinc">Zinc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
    
      </CardContent>
      <CardFooter className="flex justify-between">
      { error && 
              (  <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {error} 
                </div>)
                }
        <Button onClick={handlegoogle} variant="outline">
    <Image src="/google_logo.png" height={40} width={40} alt='hi' className='rounded'  />
                
        </Button>
        <Button  type='submit' >Login</Button>
      </CardFooter>
      </form>
    </Card>
  )
}
