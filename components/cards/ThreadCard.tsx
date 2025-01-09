"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { format } from "timeago.js";
import "timeago.js/lib/lang/de";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      name: string;
      image: string;
    }[];
  }[];
  isComment?: boolean;
  accountType?: string;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  accountType,
}: Props) => {
  return (
    <article
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a")) {
          window.location.href = `/dashboard/thread/${id}`;
        }
      }}
      className="bg-dark-100/5 flex w-full cursor-pointer flex-col rounded-xl p-7"
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/dashboard/profile/${author.id}`}
              className="relative size-11"
            >
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="cursor-pointer rounded-full object-cover"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/dashboard/profile/${author.id}`} className="w-fit">
              <p className="text-foreground text-sm font-light">@{author.id}</p>
              <h3 className="text-foreground text-base font-bold">
                {author.name}
              </h3>
            </Link>
            <Link href={`/dashboard/thread/${id}`}>
              <p className="text-dark-100 text-base">{content}</p>
            </Link>
            <div className={`mt-3 flex flex-col gap-3`}>
              <div className="flex flex-row gap-3.5">
                <Image
                  src="/icons/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/icons/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/icons/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/icons/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              <div className="text-foreground flex flex-row items-center gap-2 text-sm">
                <span>{format(createdAt, "de")}</span>
                {accountType === "User" && community && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="h-full bg-neutral-800"
                    />
                    <Link
                      href={`/dashboard/communities/${community._id}`}
                      className="flex flex-row items-center"
                    >
                      <span>{community.name} Community</span>

                      <Image
                        src={community.image}
                        alt={community.name}
                        width={14}
                        height={14}
                        className="ml-1 rounded-full object-cover"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {comments.length > 0 && (
        <div className="mt-3 flex flex-row items-center">
          {comments.map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-3"} size-8 rounded-full object-cover`}
            />
          ))}
          <p className="text-dark-100 ml-2 text-sm font-semibold">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </p>
        </div>
      )}
    </article>
  );
};

export default ThreadCard;
