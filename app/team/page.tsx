import AnalyticsCard from "@/components/dashboard/analytics-card";
import TeamList from "@/components/teams/team-list";
import TeamCard from "@/components/teams/teams-card";

export interface Team {
  isAdmin: boolean;
  name: string;
  image: string;
  isApproved: boolean;
  email: string;
}

async function getTeam(): Promise<Team[]> {
  const res = await fetch(
    "https://66a6d52223b29e17a1a39127.mockapi.io/team",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getTeam();

  return (
    <div className="p-6">
      <TeamList data={data} />
    </div>
  );
}
