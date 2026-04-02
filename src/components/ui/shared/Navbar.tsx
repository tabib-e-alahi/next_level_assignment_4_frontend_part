"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getUser, userLogOut } from "@/services/auth"
import "./nav-footer.css"
import { User } from "@/types/user"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    getCurrentUser()
  }, [loading])

  const handleLogOut = () => {
    userLogOut();
    setLoading(true);
  };

  const getDashboardLink = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "/admin-dashboard";
      case "CUSTOMER":
        return "/customer-dashboard";
      case "PROVIDER":
        return "/provider-dashboard";
      default:
        return "/";
    }
  };


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    ...(user
      ? [
        {
          name: "Dashboard",
          href: getDashboardLink(user.role),
        },
      ]
      : []),
  ];

  const profileRoute = () =>{
    if(user?.role === "CUSTOMER")
      return "/customer-dashboard/profile"
    else if(user?.role === "PROVIDER")
      return "/provider-dashboard/profile"
    else
      return "/admin-dashboard"
  }

  return (
    <header className="nav-root">
      <div className="nav-inner">

        {/* LOGO */}
        <Link href="/" className="nav-logo">
          <Image
            src="/platera_logo.png"
            alt="Platera Logo"
            width={120}
            height={60}
            className="h-[66px] w-[99px]"
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="nav-link">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT ACTIONS */}
        {user ? (
          <div className="nav-actions">
            <Link href="/cart" className="nav-cart" aria-label="Cart">
              <ShoppingCart size={16} />
            </Link>
            <Link href={profileRoute()} className="nav-btn-outline">
              Profile
            </Link>
            <Button onClick={handleLogOut} className="nav-btn-solid">Logout</Button>
          </div>
        ) : (
          <div className="nav-actions">
            <Link href="/login" className="nav-btn-outline">
              Login
            </Link>
            <Link href="/register" className="nav-btn-solid">
              Register
            </Link>
          </div>
        )}

        {/* MOBILE HAMBURGER */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="nav-mobile-trigger" aria-label="Open menu">
              <Menu size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="nav-sheet w-[280px] p-0">
            <div className="nav-sheet-inner">

              {/* sheet logo */}
              <Link href="/" className="nav-sheet-logo" onClick={() => setOpen(false)}>
                <div className="nav-sheet-logo-mark">P</div>
                <span className="nav-sheet-brand">Platera</span>
              </Link>

              {/* nav links */}
              <nav className="nav-sheet-links">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="nav-sheet-link"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {user && <Link href="/cart" className="nav-sheet-cart" onClick={() => setOpen(false)}>
                  <ShoppingCart size={13} />
                  Cart
                </Link>}
              </nav>

              <hr className="nav-sheet-divider" />

              {/* auth buttons */}
              <div className="nav-sheet-actions">
                {user ? (
                  <>
                    <Link href={profileRoute()} onClick={() => setOpen(false)}>
                      <Button className="nav-sheet-btn-outline">Profile</Button>
                    </Link>
                    <Button onClick={handleLogOut} className="nav-sheet-btn-solid">Logout</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="nav-sheet-btn-outline">Login</Button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="nav-sheet-btn-solid">Register</Button>
                    </Link>
                  </>
                )}
              </div>

            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}