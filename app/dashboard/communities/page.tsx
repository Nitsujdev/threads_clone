import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
    sortBy: "desc",
  });

  return (
    <section className="custom-scrollbar">
      <div className="flex w-full flex-col gap-4 p-10">
        <h1 className="text-xl font-bold">Communities</h1>

        {/* TODO: Search Bar */}

        <div className="mt-14 flex flex-col gap-9">
          {result.communities.length === 0 ? (
            <p className="no-result">No Result</p>
          ) : (
            <>
              {result.communities.map((community) => (
                <CommunityCard
                  key={community._id}
                  id={community.id}
                  _id={community._id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  bio={community.bio}
                  members={community.members}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
