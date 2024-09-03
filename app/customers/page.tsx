import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import AddCustomerModal from "@/components/customers/add-customer-modal";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

// async function getCustomers(): Promise<Customers[]> {
//   const res = await fetch(
//     "https://66a6d52223b29e17a1a39127.mockapi.io/Customers",
//     { cache: "no-store" }
//   );
//   const data = await res.json();
//   return data;
// }

export default async function page() {
  const session = await auth();
  if (!session) redirect("/login");

  const customers = await db.customers.findMany({});

  return (
    <div className="p-6">
      <AnalyticsCard
        title="Customers"
        subTitle="Showing all customers with orders"
      >
        <AddCustomerModal />
        <DataTable columns={columns} data={customers} />
      </AnalyticsCard>
    </div>
  );
}
