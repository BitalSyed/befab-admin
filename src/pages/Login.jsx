import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { FaDumbbell } from "react-icons/fa"
import { getCookie } from "@/components/cookieUtils"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(getCookie('skillrextech_auth')){
          navigate('/', {replace: true})
        }
      }, [])
  return (
    <div className="grid min-h-svh lg:grid-cols-2 fixed top-0 left-0 w-full z-[101] bg-secondary">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className=" text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <FaDumbbell className="!size-8 text-blue-500" />
            </div>
            BeFab
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-primary relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
