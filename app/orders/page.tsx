import AnalyticsCard from "@/components/dashboard/analytics-card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ordersDummyData } from "@/constants/data";
import { columns } from "./columns";

export default async function page() {
  return (
    <div className="p-6">
      <AnalyticsCard
        title="Products"
        subTitle="Showing All Products"
      >
        <Button className="mb-3">Create New Order</Button>
        <DataTable
          columns={columns}
          data={ordersDummyData}
        />
      </AnalyticsCard>
    </div>
  );
}
