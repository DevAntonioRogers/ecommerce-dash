import { BarGraph } from "@/components/dashboard/bar-chart";
import { HorizontalGraph } from "@/components/dashboard/horizontal-bar-chart";
import { PieGraph } from "@/components/dashboard/pie-chart";
import { RadarGraph } from "@/components/dashboard/radar-chart";
import Summary from "@/components/dashboard/summary";
import { TopCustomers } from "@/components/dashboard/top-customers";
import { TopProducts } from "@/components/dashboard/top-products";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
// async function getCustomers(): Promise<Customers[]> {
//   const res = await fetch(
//     "https://66a6d52223b29e17a1a39127.mockapi.io/Customers",
//     { cache: "no-store" }
//   );
//   const data = await res.json();
//   return data;
// }

export default async function Home() {
  const customers = await db.customers.findMany({});
  const products = await db.product.findMany({});
  const session = await auth();
  //CHECK IF A USER IS SIGNED IN
  if (!session) {
    redirect("/login");
  }

  const topCustomers = customers
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 4);

  const topProducts = products
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 4);
  return (
    <div className="p-4 grid gap-5">
      <Summary />

      <div className="grid lg:grid-cols-2 gap-10">
        <BarGraph />
        <RadarGraph />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <TopProducts
          data={topProducts.map((product) => ({
            ...product,
            image: product.image ?? "",
          }))}
        />
        <PieGraph />
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <HorizontalGraph />
        <TopCustomers data={topCustomers} />
      </div>
    </div>
  );
}
