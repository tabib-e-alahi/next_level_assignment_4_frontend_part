import DashboardSideBar from "@/components/modules/dashboard/DashboardSideBar"
import { getUser } from "@/services/auth"
import "./dashboard.css"
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

  return (
    <div className="dashboard-layout">
      <DashboardSideBar  user={user}></DashboardSideBar>
      <main className="dashboard-content">
        {customer}
        {provider}
        {admin}
      </main>
    </div>
  );
}
