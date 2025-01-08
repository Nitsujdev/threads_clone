import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <section className="custom-scrollbar p-4">
      <div className="flex w-full flex-col">
        <h1 className="mb-6 text-xl font-bold">Activity</h1>
      </div>
      <div className="flex flex-col gap-4">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link
                key={activity._id}
                href={`/dashboard/thread/${activity.parentId}`}
              >
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt={activity.author.name}
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="text-dark-100 !text-base font-medium">
                    <span className="mr-1 font-bold">
                      {activity.author.name}
                    </span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </div>
    </section>
  );
};

export default page;
