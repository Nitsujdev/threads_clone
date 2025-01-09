import Image from "next/image";
import Link from "next/link";

interface ProfileHeaderProps {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: ProfileHeaderProps) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-heading3-bold text-light-1 text-left">
              {name}
            </h2>
            <p className="text-brand-green-dark_100 text-base font-medium">
              @{username}
            </p>
          </div>
        </div>
        {accountId === authUserId && type !== "Community" && (
          <Link href="/profile/edit">
            <div className="bg-dark-3 flex cursor-pointer gap-3 rounded-lg px-4 py-2">
              <Image
                src="/assets/edit.svg"
                alt="logout"
                width={16}
                height={16}
              />

              <p className="text-light-2 max-sm:hidden">Edit</p>
            </div>
          </Link>
        )}
      </div>

      <p className="text-base-regular text-light-2 mt-6 max-w-lg">{bio}</p>

      <div className="bg-dark-3 mt-12 h-0.5 w-full" />
    </div>
  );
};

export default ProfileHeader;
