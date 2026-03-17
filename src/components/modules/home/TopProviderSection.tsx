import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { getProviders } from "@/services/categories/getProviders"
import "./home.css"

export default async function TopProvidersSection() {
  const topProviders = await getProviders(5)

  return (
    <section className="home-section">
      <div className="home-container">

        <hr className="sec-rule" />

        <div className="prov-header">
          <div>
            <div className="sec-eyebrow">
              <span className="sec-eyebrow-dot" />
              Top Providers
            </div>
            <h2 className="sec-title">
              Popular restaurants <em>near you</em>
            </h2>
            <p className="sec-sub">
              Discover trusted restaurants and food providers with great meals,
              clear details, and live availability.
            </p>
          </div>

          <Link href="/providers" className="sec-link">
            View all providers
            <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="prov-grid">
          {topProviders.map((provider) => (
            <Link
              key={provider.id}
              href={`/providers/${provider.id}`}
              className="prov-card"
            >
              {/* IMAGE */}
              <div className="prov-img-wrap">
                <Image
                  src={provider.businessLogo}
                  alt={provider.businessName}
                  fill
                  className="object-cover"
                />
                <div className="prov-img-veil" />

                <span className={`prov-status ${provider.isOpen ? "open" : "closed"}`}>
                  <span className="prov-status-dot" />
                  {provider.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>

              {/* BODY */}
              <div className="prov-body">
                <div className="prov-top">
                  <div style={{ minWidth: 0 }}>
                    <h3 className="prov-name">{provider.businessName}</h3>
                    <p className="prov-subtitle">{provider.businessSubtitle}</p>
                  </div>

                  <div className="prov-arrow">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="prov-meta">
                  <span>{provider.isOpen ? "Accepting Orders" : "Unavailable"}</span>
                  <span className="prov-meta-sep">·</span>
                  <span className="prov-meta-city">{provider.city}</span>
                </div>

                <p className="prov-desc">{provider.description}</p>

                <div className="prov-foot">
                  <span className={`prov-foot-indicator ${provider.isOpen ? "open" : "closed"}`} />
                  <span className="prov-foot-label">
                    {provider.isOpen ? "Available for orders" : "Temporarily closed"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}