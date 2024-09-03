import AnalyticsCard from "@/components/dashboard/analytics-card";
import TeamList from "@/components/teams/team-list";
import TeamCard from "@/components/teams/teams-card";
import { TeamSchema } from "@/types/team-schema";
import { z } from "zod";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { getRoleStatus } from "@/server/actions/get-role-status";

// export interface Team {
//   isAdmin: boolean;
//   name: string;
//   image: string;
//   isApproved: boolean;
//   email: string;
// }

// async function getTeam(): Promise<Team[]> {
//   const res = await fetch(
//     "https://66a6d52223b29e17a1a39127.mockapi.io/team",
//     { cache: "no-store" }
//   );
//   const data = await res.json();
//   return data;
// }

export type Team = z.infer<typeof TeamSchema>;

export default async function page() {
  const team = await db.user.findMany({});
  const session = await auth();
  if (!session) redirect("/");

  const role = await getRoleStatus();

  return (
    <div className="p-6">
      <TeamList data={team} role={role!} />
    </div>
  );
}
