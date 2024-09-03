import OnboardingForm from "@/components/authenticate/onboarding-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className="h-screen w-full flex justify-center items-center p-6">
      <OnboardingForm session={session} />
    </div>
  );
}
