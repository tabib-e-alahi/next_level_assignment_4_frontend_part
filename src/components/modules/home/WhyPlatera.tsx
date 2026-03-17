import { Clock3, ShieldCheck, Store, Truck } from "lucide-react"
import "./home.css"

const features = [
  {
    title: "Fresh From Trusted Kitchens",
    description:
      "Order from verified food providers serving quality meals with clear business details and reliable service.",
    icon: Store,
  },
  {
    title: "Fast & Smooth Ordering",
    description:
      "Browse categories, discover restaurants, and place your order through a simple and user-friendly experience.",
    icon: Clock3,
  },
  {
    title: "Safe & Transparent Experience",
    description:
      "See provider details, availability status, and meal information before you order, so every decision feels clear.",
    icon: ShieldCheck,
  },
  {
    title: "Convenient Delivery Flow",
    description:
      "From choosing your meal to checkout and order tracking, FoodHub makes the entire journey feel effortless.",
    icon: Truck,
  },
]

export default function WhyPlatera() {
  return (
    <section className="home-section">
      <div className="home-container">

        <hr className="sec-rule" />

        <div className="why-grid">

          {/* LEFT — text + feature cards */}
          <div>
            <div className="sec-eyebrow">
              <span className="sec-eyebrow-dot" />
              Why Choose FoodHub
            </div>

            <h2 className="sec-title">
              A smarter way to discover<br />
              <em>and order food</em>
            </h2>

            <p className="sec-sub">
              FoodHub connects hungry customers with trusted food providers
              through a clean, modern, and reliable ordering experience. From
              browsing meals to checking availability, everything is designed to
              feel simple and useful.
            </p>

            <div className="why-features">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="why-card">
                    <div className="why-icon">
                      <Icon size={18} />
                    </div>
                    <h3 className="why-feat-title">{feature.title}</h3>
                    <p className="why-feat-desc">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — stat panel */}
          <div className="why-panel">
            <div className="why-panel-glow" aria-hidden />

            <div className="why-panel-inner">

              <div className="why-stat">
                <p className="why-stat-label">Active Providers</p>
                <div className="why-stat-value">120+</div>
              </div>

              <div className="why-stat-grid">
                <div className="why-stat why-stat-sm">
                  <p className="why-stat-label">Cuisine Types</p>
                  <div className="why-stat-value">25+</div>
                </div>
                <div className="why-stat why-stat-sm">
                  <p className="why-stat-label">Daily Orders</p>
                  <div className="why-stat-value">500+</div>
                </div>
              </div>

              <div className="why-quote">
                <p>
                  Discover meals faster, compare providers more easily, and
                  order with confidence from a platform built around clarity
                  and convenience.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}