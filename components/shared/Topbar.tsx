"use client";

import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { light } from "@clerk/themes";
function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/dashboard" className="flex items-center gap-4">
        <Image
          src="/logos/wishlist_fav.svg"
          alt="logo"
          width={32}
          height={32}
        />
        <p className="text-foreground max-mobile:hidden text-lg font-bold">
          Wishlist
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="tablet:hidden block">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer items-center gap-1 p-4">
                <Image
                  src="/icons/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: light,
            elements: { organizationSwitcherTrigger: "py-2 px-4" },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
