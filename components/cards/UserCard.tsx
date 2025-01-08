"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  const router = useRouter();
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          alt={name}
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex-1 text-ellipsis">
          <h4 className="text-dark-100 text-base font-semibold">{name}</h4>
          <p className="text-small text-dark-200 font-medium">@{username}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => {
          router.push(`/dashboard/profile/${id}`);
        }}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
