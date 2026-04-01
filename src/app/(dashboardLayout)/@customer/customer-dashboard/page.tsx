export default function CustomerDashboard() {
  return (
    <div>
      <section className="min-h-[70vh] w-full flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl rounded-[28px] border border-[#e8a030]/15 bg-[linear-gradient(180deg,rgba(200,80,10,0.10)_0%,rgba(232,160,48,0.05)_100%)] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-8 py-12 text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#e8a030]">
            Customer Dashboard
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#fff7ec] leading-tight">
            Welcome To Your Dashboard
          </h1>

          <p className="mt-4 text-sm md:text-base leading-7 text-[rgba(245,239,230,0.72)] max-w-xl mx-auto">
            Here you can explore all your activites, meals, orders
          </p>

        </div>

      </section>
    </div>
  );
}