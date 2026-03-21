import { NextRequest, NextResponse } from "next/server"
import { getUser } from "@/services/auth"

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN"

// const PUBLIC_ROUTES = ["/", "/login", "/register", "/meals", "/meals/:path*"]
// const AUTH_ROUTES = ["/login", "/register"]

const ROLE_BASED_ROUTES: { prefix: string; roles: Role[] }[] = [
  {
    prefix: "/customer-dashboard",
    roles: ["CUSTOMER"],
  },
  {
    prefix: "/provider-dashboard",
    roles: ["PROVIDER"],
  },
  {
    prefix: "/admin-dashboard",
    roles: ["ADMIN"],
  },
  {
    prefix: "/cart",
    roles: ["CUSTOMER"],
  },
  {
    prefix: "/checkout",
    roles: ["CUSTOMER"],
  },
]

// function isPublicRoute(pathname: string) {
//   if (
//     pathname === "/" ||
//     pathname === "/login" ||
//     pathname === "/register" ||
//     pathname === "/meals" ||
//     pathname.startsWith("/meals/")
//   ) {
//     return true
//   }

//   return false
// }

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const userData = await getUser()

  const isAuthenticated = !!userData
  const userRole = userData?.role as Role | undefined

  
  // Check protected routes
  const matchedRoute = ROLE_BASED_ROUTES.find((route) =>
    pathname.startsWith(route.prefix)
  )

  // If route is protected and user is not logged in
  if (matchedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If route is protected and role is not allowed
  if (matchedRoute && isAuthenticated) {
    const isAllowed = matchedRoute.roles.includes(userRole as Role)

    if (!isAllowed) {
      // Redirect user based on their own role
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
      }

      if (userRole === "PROVIDER") {
        return NextResponse.redirect(new URL("/provider-dashboard", request.url))
      }

      if (userRole === "CUSTOMER") {
        return NextResponse.redirect(new URL("/", request.url))
      }

      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/cart",
    // "/checkout",
    // "/customer-dashboard/:path*",
    // "/provider-dashboard/:path*",
    // "/admin-dashboard/:path*",
  ],
}