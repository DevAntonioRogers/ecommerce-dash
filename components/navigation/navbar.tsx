"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import Logo from "./logo";
import MenuToggle from "./menu-toggle";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";
import useRouteCheck from "@/hooks/useRouteCheck";
import { Session } from "next-auth";

type NavbarProps = {
  session: Session | null;
};

const Navbar = (session: NavbarProps) => {
  const [loading, setIsLoading] = useState(true);
  const loginRoute = useRouteCheck(["login"]);
  const registerRoute = useRouteCheck(["register"]);
  const onboardingRoute = useRouteCheck(["onboarding"]);

  const user = session.session?.user;

  // if (loginRoute || registerRoute) return;

  useEffect(() => {
    if (!loginRoute && !onboardingRoute && !registerRoute) {
      setIsLoading(false);
    }
  }, [loginRoute, registerRoute, onboardingRoute]);

  if (
    loading ||
    loginRoute ||
    registerRoute ||
    onboardingRoute
  )
    return null;
  return (
    <nav className="py-4 border-b">
      <div className="md:w-[95%] w-[92%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo />
          <MenuToggle />
        </div>
        <div className="flex gap-8 items-center">
          <ModeToggle />
          <span className="max-md:hidden">
            Welcome Back {user?.name} 👋
          </span>
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
