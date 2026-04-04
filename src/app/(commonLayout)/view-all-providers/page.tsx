import { publicService } from "@/services/public.service";
import { Provider } from "@/types/provider";
import "./view-all-providers.css"

export default async function ViewProviderPage() {
  const providers = await publicService.getAllProviders()
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">All providers</h1>
      </div>


      <section className="admin-user-section">
        <div className="prov-grid">
          {providers.data.map((provider: Provider) => (
            <div
              key={provider.id}
              className="prov-card"
            >
              {/* IMAGE */}
              <div className="prov-img-wrap">

                <img src={provider.businessLogo} alt={provider.businessName} className="object-cover" />
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}