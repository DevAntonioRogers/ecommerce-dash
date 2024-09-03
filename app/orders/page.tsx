import AnalyticsCard from "@/components/dashboard/analytics-card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ordersDummyData } from "@/constants/data";
import { columns } from "./columns";
import AddOrder from "@/components/orders/add-order-modal";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/login");
  const orders = await db.orders.findMany({});
  return (
    <div className="p-6">
      <AnalyticsCard
        title="Orders"
        subTitle="Showing All Orders"
      >
        <AddOrder />
        <DataTable columns={columns} data={orders} />
      </AnalyticsCard>
    </div>
  );
}
