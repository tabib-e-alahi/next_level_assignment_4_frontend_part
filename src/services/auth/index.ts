import { FieldValues } from "react-hook-form";

export const registerUser = async (payload: FieldValues) => {
      try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
                  method:"POST",
                  headers:{
                        "Content-Type":"application/json"
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
                  method:"POST",
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body: JSON.stringify(payload)
            })

            const result = await res.json();
            return result;
      } catch (error: any) {
            console.log(error, error.message);
      }
}