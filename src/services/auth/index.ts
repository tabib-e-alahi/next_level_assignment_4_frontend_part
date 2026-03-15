"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (payload: FieldValues) => {
      try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(payload)
            })

            const result = await res.json();
            return result;
      } catch (error: any) {
            console.log(error, error.message);
      }
}



export const loginUser = async (payload: FieldValues) => {
      try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(payload)
            })

            const result = await res.json();

            const cookieStore = await cookies();

            if (result?.success) {
                  cookieStore.set("token", result?.data?.token)
            }
            return result;
      } catch (error: any) {
            console.log(error, error.message);
      }
}

export const getUser = async() =>{
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value
      let decodeData = null
      if(token){
            decodeData = await jwtDecode(token);
            return decodeData
      }else{
            return null;
      }
}