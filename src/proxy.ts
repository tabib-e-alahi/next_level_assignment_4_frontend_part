import { NextRequest, NextResponse } from "next/server"
import { getUser } from "@/services/auth"
import { Role } from "@/constants/roles";


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

  // if the user is not authenticated then will redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const userRole = userData?.role as Role | undefined

  // Check protected routes
  const matchedRoute = ROLE_BASED_ROUTES.find((routeObj) =>
    pathname.startsWith(routeObj.route)
  )

  if (matchedRoute && isAuthenticated) {
    const isAllowed = matchedRoute!.roles.includes(userRole as Role)

    if (!isAllowed && userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }

    if (!isAllowed && userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url))
    }

    if (!isAllowed && userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/customer-dashboard", request.url))
    }

    return NextResponse.redirect(new URL("/login", request.url))
  }


  return NextResponse.next()
}

export const config = {
  matcher: [
    "/cart",
    // "/checkout",
    "/customer-dashboard/:path*",
    "/provider-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
}