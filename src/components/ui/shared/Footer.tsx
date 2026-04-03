"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

import "./nav-footer.css"

const footerLinks = {
  company: [
    { label: "Home",     href: "/"     },
    { label: "Meals",     href: "/meals"     },
    { label: "Providers", href: "/view-all-providers" },
  ],
  account: [
    { label: "Login",    href: "/login"    },
    { label: "Register", href: "/register" },
    { label: "Cart",     href: "/cart"     },
  ],
  legal: [
    { label: "Privacy Policy",    href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms"          },
    { label: "Refund Policy",     href: "/refund-policy"  },
  ],
  social: [
    { label: "Facebook",  href: "https://facebook.com",  icon: Facebook  },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "Twitter",   href: "https://twitter.com",   icon: Twitter   },
  ],
}

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-inner">

        {/* MAIN GRID */}
        <div className="footer-grid">

          {/* BRAND COLUMN */}
          <div>
            <Link href="/" className="footer-brand-logo">
              <div className="footer-logo-mark">P</div>
              <div>
                <p className="footer-brand-name">Platera</p>
                <p className="footer-brand-tagline">
                  Fresh meals, trusted providers.
                </p>
              </div>
            </Link>

            <p className="footer-brand-desc">
              Platera connects customers with quality meal providers through a clean,
              reliable, and fast ordering experience built for everyday convenience.
            </p>

            <div className="footer-contact">
              <div className="footer-contact-row">
                <div className="footer-contact-icon">
                  <Mail size={13} />
                </div>
                <span>support@foodhub.com</span>
              </div>
              <div className="footer-contact-row">
                <div className="footer-contact-icon">
                  <Phone size={13} />
                </div>
                <span>+880 1234-567890</span>
              </div>
              <div className="footer-contact-row">
                <div className="footer-contact-icon">
                  <MapPin size={13} />
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* LINK COLUMNS */}
          <FooterLinkColumn title="Company" links={footerLinks.company} />
          <FooterLinkColumn title="Account" links={footerLinks.account} />
          <FooterLinkColumn title="Legal"   links={footerLinks.legal}   />
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>

          <div className="footer-socials">
            {footerLinks.social.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="footer-social-btn"
                >
                  <Icon size={14} />
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </footer>
  )
}

/* ── COLUMN COMPONENT ── */
type FooterLinkColumnProps = {
  title: string
  links: { label: string; href: string }[]
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div>
      <h3 className="footer-col-title">{title}</h3>
      <ul className="footer-col-links">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="footer-col-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}