import DashboardSideBar from "@/components/modules/dashboard/DashboardSideBar"
import { getUser } from "@/services/auth"

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
    <div className="flex">
      <DashboardSideBar userRole={user.role}></DashboardSideBar>
      <div>
        {customer}
        {provider}
        {admin}
      </div>
    </div>
  );
}
