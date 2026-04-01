type ProviderProfile = {
  userId: string;
  businessName: string;
  businessSubtitle: string;
  businessPhone: string;
  businessAdress: string;
  description: string;
  city: string;
  businessLogo: string;
  isOpen: boolean;
};

export default function ProfileView({
  profile,
}: {
  profile: ProviderProfile;
}) {
  return (
    <section className="min-h-[70vh] w-full px-6 py-10">
      <div className="mx-auto w-full max-w-5xl rounded-[28px] border border-[#e8a030]/15 bg-[linear-gradient(180deg,rgba(200,80,10,0.10)_0%,rgba(232,160,48,0.05)_100%)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-10">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#e8a030]">
          Provider Profile
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profile.businessLogo}
              alt={profile.businessName}
              className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
            />

            <div>
              <h1 className="font-serif text-3xl text-[#fff7ec] md:text-4xl">
                {profile.businessName}
              </h1>
              <p className="mt-1 text-sm text-[#f2d3a0]">
                {profile.businessSubtitle}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex h-fit items-center rounded-full border px-3 py-1 text-xs font-medium ${
              profile.isOpen
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                : "border-red-400/20 bg-red-400/10 text-red-300"
            }`}
          >
            {profile.isOpen ? "Open" : "Closed"}
          </span>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#e8a030]">
              Business Phone
            </p>
            <p className="text-sm leading-7 text-[rgba(245,239,230,0.82)]">
              {profile.businessPhone || "Not available"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#e8a030]">
              City
            </p>
            <p className="text-sm leading-7 text-[rgba(245,239,230,0.82)]">
              {profile.city}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#e8a030]">
              Business Address
            </p>
            <p className="text-sm leading-7 text-[rgba(245,239,230,0.82)]">
              {profile.businessAdress}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#e8a030]">
              Description
            </p>
            <p className="text-sm leading-7 text-[rgba(245,239,230,0.82)]">
              {profile.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}