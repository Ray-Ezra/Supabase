'use client';

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

export type FormData = {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter();

  async function login(): Promise<void>{
    setIsLoading(true)
    setError("")
    setSuccess("")

    try{
      const {error} = await supabase
        .auth
        .signInWithPassword(formData)

      if(error){
        throw new Error(error.message)
      }else{
        setError("")
        setSuccess(`Login successful`)
        router.replace('/')
      }
    }catch (error: unknown) {
      setError((error as Error).message)
    }finally{
      setIsLoading(false)
    }
  }

  function handleChange(e: any){
    setError("")

    try{
      const { name, value } = e.target;

      if (!value) {
        throw new Error(`The property ${name} must have a value`);
      }

      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));

      setError("")
    }catch(error: unknown){
      setError((error as Error).message);
    }
  }

  return <AuthForm
    success={success}
    error={error}
    loading={isLoading}
    authAction={login}
    handleFormData={handleChange}
    formData={formData}
    authText="Log in"
  />;
}