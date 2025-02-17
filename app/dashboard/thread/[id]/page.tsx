import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(id);

  return (
    <section className="relative">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-between">
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={user?.id || ""}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        </div>
        <div className="mt-7">
          <Comment
            threadId={thread._id}
            currentUserImage={userInfo.image}
            currentUserId={userInfo._id.toString()}
          />
        </div>
        <div className="mt-10">
          {thread.children.map((childItem: any) => (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={childItem?.id || ""}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
