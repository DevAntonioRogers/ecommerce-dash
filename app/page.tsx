import { BarGraph } from "@/components/dashboard/bar-chart";
import Summary from "@/components/dashboard/summary";

export default function Home() {
  return (
    <div className="p-4 grid gap-5">
      <Summary />

      <div className="grid lg:grid-cols-2 gap-10">
        <BarGraph />
      </div>
    </div>
  );
}
