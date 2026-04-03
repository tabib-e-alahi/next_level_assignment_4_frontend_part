import DashboardSideBar from "@/components/modules/dashboard/DashboardSideBar"
import { getUser } from "@/services/auth"
import "./dashboard.css"
import { redirect } from "next/navigation"
export default async function DashboardLeayout({
  customer,
  provider,
  admin
}: {
  customer: React.ReactNode
  provider: React.ReactNode
  admin: React.ReactNode
}) {

  const user = await getUser()

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <DashboardSideBar user={user}></DashboardSideBar>
      <main className="dashboard-content">
        {customer}
        {provider}
        {admin}
      </main>
    </div>
  );
}
