"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
function LeftSidebar() {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-2 px-6">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          if (link.route === "/") return null;

          if (link.route === "/profile") link.route = `/profile/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-brand-green-light_100"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-foreground max-laptop:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer items-center gap-4 p-4">
              <Image
                src="/icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-foreground text-base">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
