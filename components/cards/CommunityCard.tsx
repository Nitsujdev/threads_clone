import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  id: string;
  _id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ _id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/dashboard/communities/${_id}`}
          className="relative size-12"
        >
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          <Link href={`/dashboard/communities/${_id}`}>
            <h4 className="text-dark-100 text-base font-bold">{name}</h4>
          </Link>
          <p className="text-dark-200 text-sm font-medium">@{username}</p>
        </div>
      </div>

      <p className="text-dark-200 mt-4 text-sm">{bio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/dashboard/communities/${_id}`}>
          <Button size="sm" className="community-card_btn">
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="text-subtle-medium text-gray-1 ml-1">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
