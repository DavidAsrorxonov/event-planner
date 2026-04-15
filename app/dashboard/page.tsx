import DashbaordContent from "@/components/dashboard-content";
import { getSession } from "@/lib/auth/server";

const DashboardPage = async () => {
  const session = await getSession();

  return <DashbaordContent userId={session.data?.user.id} />;
};

export default DashboardPage;
