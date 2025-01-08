import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    PAGE_SIZE: 20,
    sortBy: "desc",
  });

  return (
    <section className="custom-scrollbar">
      <div className="flex w-full flex-col gap-4 p-10">
        <h1 className="text-xl font-bold">Search</h1>

        {/* TODO: Search Bar */}

        <div className="mt-14 flex flex-col gap-9">
          {result.users.length === 0 ? (
            <p className="no-result">No Result</p>
          ) : (
            <>
              {result.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
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
