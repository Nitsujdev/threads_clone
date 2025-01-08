"use client";

import Image from "next/image";
import Link from "next/link";

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
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${isComment ? "mobile:px-7 px-0" : "bg-dark-100/5 p-7"}`}
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
            <div className={`mt-3 flex flex-col gap-3 ${isComment && "mb-10"}`}>
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
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="text-foreground mt-1 text-sm">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
