"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Meals", href: "/meals" },
    { label: "Providers", href: "/providers" },
    { label: "Contact", href: "/contact" },
  ],
  account: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Cart", href: "/cart" },
    { label: "Orders", href: "/orders" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
  social: [
    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="text-lg font-bold">F</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Platera</h2>
                <p className="text-sm text-muted-foreground">
                  Fresh meals, trusted providers, and a smooth ordering experience.
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Platera connects customers with quality meal providers through a clean,
              reliable, and fast ordering experience built for everyday convenience.
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <span>support@foodhub.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          <FooterLinkColumn title="Company" links={footerLinks.company} />
          <FooterLinkColumn title="Account" links={footerLinks.account} />
          <FooterLinkColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="flex flex-col gap-4 border-t py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {footerLinks.social.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Icon className="size-4" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

type FooterLinkColumnProps = {
  title: string
  links: {
    label: string
    href: string
  }[]
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}