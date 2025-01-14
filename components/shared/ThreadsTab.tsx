import { fetchUserThreads } from "@/lib/actions/user.actions";
import { fetchCommunityThreads } from "@/lib/actions/community.action";
import ThreadCard from "../cards/ThreadCard";

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) => {
  let result;
  if (accountType === "Community") {
    result = await fetchCommunityThreads(accountId);
  } else {
    result = await fetchUserThreads(accountId);
  }
  if (!result?.threads || result.threads.length === 0) {
    return <p>Noch keine Threads vorhanden.</p>;
  }

  return (
    <section className="mt-6 flex flex-col gap-3">
      {result?.threads.map((thread: any) => (
        <ThreadCard
          key={`thread-${thread._id}`}
          id={thread.id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          accountType={accountType}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
