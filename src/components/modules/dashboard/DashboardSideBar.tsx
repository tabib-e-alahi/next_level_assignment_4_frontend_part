import Link from "next/link";
import {
  LogOut,
  ChevronRight,
  Flame,
} from "lucide-react";
import { adminRoutes } from "@/routes/adminRoutes";
import { customerRoutes } from "@/routes/customerRoutes";
import { providerRoutes } from "@/routes/providerRoutes";

export default function DashboardSideBar(userRole: {userRole: string}) {

  let routes: any = [];

  switch (userRole.userRole) {
    case "ADMIN":
      routes = adminRoutes
      break;
    case "CUSTOMER":
      routes = customerRoutes
      break;
    case "PROVIDER":
      routes = providerRoutes
      break;
    default:
      routes = []
      break;
  }

  console.log(routes);
  return (
    <aside className="relative flex min-h-screen w-full max-w-[320px] flex-col overflow-hidden border-r border-white/10 bg-[#0a0807] text-[#f5f0e8]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,160,48,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(200,80,10,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#e8a030]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#c8500a]/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#f5f0e8_0.6px,transparent_0.6px)] [background-size:12px_12px]" />

        <div className="relative border-b border-white/10 px-6 pb-6 pt-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-[30px] leading-none tracking-tight text-[#f5f0e8]">
                {routes.title.split(" ")[0]}
                <span className="ml-2 inline-block italic text-[#e8a030]">{routes.title.split(" ")[1]}</span>
              </h1>
            </div>

            <div className="mt-1 flex items-center gap-2 rounded-full border border-[#e8a030]/25 bg-[#e8a030]/10 px-3 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e8a030]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#f5f0e8]/80">
                Live
              </span>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            {/* <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8a030] to-[#c8500a] text-[#0a0807] shadow-[0_10px_24px_rgba(200,80,10,0.35)]">
                <Flame size={18} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#f5f0e8]/50">
                  Tonight’s shift
                </p>
                <p className="text-sm text-[#f5f0e8]">Peak dinner service</p>
              </div>
            </div> */}

            <p className="mb-4 text-sm leading-6 text-[#f5f0e8]/70">
              A dashboard shell with a premium food-editorial mood, tuned for fast team decisions and calm high-volume flow.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[
                ["128", "Orders"],
                ["24m", "Avg prep"],
                ["4.9", "Rating"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3"
                >
                  <p className="font-serif text-lg leading-none text-[#f5f0e8]">{value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e8]/45">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="relative flex-1 px-4 py-5">
          <div className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e8]/35">
            Navigation
          </div>

          <div className="space-y-2">
            {routes.navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-[22px] border px-4 py-3 text-left transition-all duration-300 ${item.active
                    ? "border-[#e8a030]/25 bg-gradient-to-r from-[#e8a030]/14 via-[#c8500a]/10 to-transparent shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                    : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.035]"
                    }`}
                >
                  <span
                    className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-[#e8a030] to-[#c8500a] ${item.active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                  />

                  <span
                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${item.active
                      ? "border-[#e8a030]/25 bg-[#e8a030]/12 text-[#e8a030]"
                      : "border-white/10 bg-white/[0.03] text-[#f5f0e8]/70 group-hover:text-[#f5f0e8]"
                      }`}
                  >
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[15px] ${item.active ? "text-[#f5f0e8]" : "text-[#f5f0e8]/76"
                        }`}
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e8]/35">
                      Section {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>

                  {item.badge ? (
                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${item.active
                        ? "border-[#e8a030]/30 bg-[#e8a030]/12 text-[#f5f0e8]"
                        : "border-white/10 bg-white/[0.03] text-[#f5f0e8]/55"
                        }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}

                  <ChevronRight
                    size={16}
                    className={`shrink-0 transition-all duration-300 ${item.active
                      ? "translate-x-0 text-[#e8a030] opacity-100"
                      : "-translate-x-1 text-[#f5f0e8]/25 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="relative border-t border-white/10 p-4">
          <div className="mb-3 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e8a030]/80">
              Active panel
            </p>
            <div className="mt-2">
              <p className="font-serif text-2xl leading-none italic text-[#f5f0e8]">Overview</p>
              <p className="mt-2 text-sm leading-6 text-[#f5f0e8]/62">
                Built for quick scanning, strong hierarchy, and a richer premium-brand feel.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="group flex w-full items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all duration-300 hover:border-[#c8500a]/25 hover:bg-[#c8500a]/[0.06]"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[#f5f0e8]/75 transition-colors duration-300 group-hover:text-[#f5f0e8]">
                <LogOut size={17} />
              </span>
              <span>
                <span className="block text-sm text-[#f5f0e8]">Sign out</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e8]/35">
                  End session
                </span>
              </span>
            </span>
            <ChevronRight
              size={16}
              className="text-[#f5f0e8]/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#e8a030]"
            />
          </button>
        </div>
      </aside>
  );
}
