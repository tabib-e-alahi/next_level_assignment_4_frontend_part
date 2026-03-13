"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
      Sheet,
      SheetContent,
      SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"

export default function Navbar() {
      const [open, setOpen] = useState(false)

      const navLinks = [
            { name: "Home", href: "/" },
            { name: "Meals", href: "/meals" },
            { name: "Orders", href: "/orders" },
      ]

      return (
            <header className="sticky top-0 z-50 w-full border-b bg-white">
                  <div className="container mx-auto flex h-12 md:h-24 items-center justify-between px-6 md:px-24">

                        <Link href="/">
                              <Image
                                    src="/platera_logo.png"
                                    alt="Platera Logo"
                                    width={120}
                                    height={60}
                                    className="w-15 h-7.5 md:w-28 md:h-16"
                              />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                              {navLinks.map((link) => (
                                    <Link
                                          key={link.name}
                                          href={link.href}
                                          className="text-sm font-medium hover:text-primary transition"
                                    >
                                          {link.name}
                                    </Link>
                              ))}
                        </nav>

                        {/* Right Section */}
                        <div className="hidden md:flex items-center gap-3">

                              <Link href="/cart">
                                    <Button variant="ghost" size="icon">
                                          <ShoppingCart size={20} />
                                    </Button>
                              </Link>

                              <Link href="/login">
                                    <Button variant="outline">Login</Button>
                              </Link>

                              <Link href="/register">
                                    <Button>Register</Button>
                              </Link>
                        </div>

                        {/* Mobile Menu */}
                        <Sheet open={open} onOpenChange={setOpen}>
                              <SheetTrigger asChild className="md:hidden">
                                    <Button variant="ghost" size="icon">
                                          <Menu size={24} />
                                    </Button>
                              </SheetTrigger>

                              <SheetContent side="left" className="w-65">
                                    <div className="mt-6 flex flex-col gap-4">

                                          {navLinks.map((link) => (
                                                <Link
                                                      key={link.name}
                                                      href={link.href}
                                                      onClick={() => setOpen(false)}
                                                      className="text-base font-medium"
                                                >
                                                      {link.name}
                                                </Link>
                                          ))}

                                          <Link href="/cart" onClick={() => setOpen(false)}>
                                                Cart
                                          </Link>

                                          <div className="flex flex-col gap-2 pt-4">

                                                <Link href="/login">
                                                      <Button variant="outline" className="w-full">
                                                            Login
                                                      </Button>
                                                </Link>

                                                <Link href="/register">
                                                      <Button className="w-full">
                                                            Register
                                                      </Button>
                                                </Link>

                                          </div>
                                    </div>
                              </SheetContent>
                        </Sheet>

                  </div>
            </header>
      )
}