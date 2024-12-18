"use client";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RegForm } from "./RegForm";
import { LoginForm } from "./LoginForm";

export default function LogRegBack() {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
             Login using your credentials or with Google
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
                <LoginForm/>
          </CardContent>
   
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Join us now!!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
                <RegForm/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
