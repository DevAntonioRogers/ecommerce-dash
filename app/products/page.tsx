import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import AnalyticsCard from "@/components/dashboard/analytics-card";
import { ProductsDummyData } from "@/constants/data";
import { Button } from "@/components/ui/button";
import AddProduct from "@/components/products/add-product-modal";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/login");

  const productData = await db.product.findMany({});
  return (
    <section className="p-6">
      <AnalyticsCard
        title="Products"
        subTitle="Showing All Products"
      >
        <AddProduct />
        <DataTable
          columns={columns}
          data={productData.map((product) => ({
            ...product,
            image: product.image ?? "",
          }))}
        />
      </AnalyticsCard>
    </section>
  );
}
