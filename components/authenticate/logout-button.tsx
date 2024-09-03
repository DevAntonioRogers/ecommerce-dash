"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMenuStore } from "@/store/toggleMenuStore";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  const { isOpen } = useMenuStore();
  return (
    <div>
      <Button asChild onClick={() => signOut()}>
        <Link href={"/"} className="flex gap-2">
          <LogOut />
          <span
            className={`${!isOpen && "max-md:hidden"} ${
              isOpen && "hidden"
            }`}
          >
            Log Out
          </span>
        </Link>
      </Button>
    </div>
  );
}
