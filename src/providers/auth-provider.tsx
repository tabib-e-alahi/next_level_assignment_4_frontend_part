// "use client"

// import React, { createContext, useContext, useMemo, useState } from "react"

// type User = {
//   id?: string
//   email?: string
//   role?: "CUSTOMER" | "PROVIDER" | "ADMIN"
//   name?: string
// }

// type AuthContextType = {
//   user: User
//   setUser: React.Dispatch<React.SetStateAction<User>>
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({
//   children,
//   initialUser,
// }: {
//   children: React.ReactNode
//   initialUser: User
// }) {
//   const [user, setUser] = useState<User>(initialUser)

//   const logout = () => {
//     setUser(null)
//   }

//   const value = useMemo(
//     () => ({
//       user,
//       setUser,
//       logout,
//     }),
//     [user]
//   )

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)

//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }

//   return context
// }