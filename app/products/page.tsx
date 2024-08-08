import { columns, Products } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { ProductsDummyData } from "@/constants/data";
import { Button } from "@/components/ui/button";

export default async function page() {
  return (
    <section className="p-6">
      <AnalyticsCard
        title="Products"
        subTitle="Showing All Products"
      >
        <Button className="mb-3">Add new product</Button>
        <DataTable
          columns={columns}
          data={ProductsDummyData}
        />
      </AnalyticsCard>
    </section>
  );
}
