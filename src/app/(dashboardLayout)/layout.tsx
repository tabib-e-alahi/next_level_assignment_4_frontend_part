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

const userInfo = {
  name: user.name as string,
  role: user.role as string
}
  return (
    <div className="flex">
      <DashboardSideBar user={user}></DashboardSideBar>
      <div>
        {customer}
        {provider}
        {admin}
      </div>
    </div>
  );
}
