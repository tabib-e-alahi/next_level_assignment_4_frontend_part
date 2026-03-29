import { NextRequest, NextResponse } from "next/server"
import { getUser } from "@/services/auth"
import { Role, Roles } from "@/constants/roles";



// const PUBLIC_ROUTES = ["/", "/login", "/register", "/meals", "/meals/:path*"]
// const AUTH_ROUTES = ["/login", "/register"]

const ROLE_BASED_ROUTES: { route: string; roles: Role[] }[] = [
  {
    route: "/customer-dashboard",
    roles: ["CUSTOMER"],
  },
  {
    route: "/provider-dashboard",
    roles: ["PROVIDER"],
  },
  {
    route: "/admin-dashboard",
    roles: ["ADMIN"],
  },
  {
    route: "/cart",
    roles: ["CUSTOMER"],
  },
  {
    route: "/checkout",
    roles: ["CUSTOMER"],
  },
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log("Path name : ---", pathname);

  const userData = await getUser()
  console.log("Form proxy-----: ", userData);

  const isAuthenticated = !!userData
  const userRole = userData?.role as Role | undefined

  // if the user is not authenticated then will redirect to login
  if(!isAuthenticated){
    return NextResponse.redirect(new URL("/login", request.url))
  }
  
  // Check protected routes
  const matchedRoute = ROLE_BASED_ROUTES.find((routeObj) =>
    pathname.startsWith(routeObj.route)
  )

  // If route is protected and role is not allowed
  // if (matchedRoute && isAuthenticated) {
  //   const isAllowed = matchedRoute.roles.includes(userRole as Role)

  //   if (!isAllowed) {
  //     // Redirect user based on their own role
  //     if (userRole === "ADMIN") {
  //       return NextResponse.redirect(new URL("/admin-dashboard", request.url))
  //     }

  //     if (userRole === "PROVIDER") {
  //       return NextResponse.redirect(new URL("/provider-dashboard", request.url))
  //     }

  //     if (userRole === "CUSTOMER") {
  //       return NextResponse.redirect(new URL("/", request.url))
  //     }

  //     return NextResponse.redirect(new URL("/login", request.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/cart",
    // "/checkout",
    // "/customer-dashboard/:path*",
    // "/provider-dashboard/:path*",
    // "/admin-dashboard/:path*",
  ],
}