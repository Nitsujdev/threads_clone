import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import PostThread from "@/components/forms/PostThread";
async function CreateThread() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="text-2xl font-bold">Create Thread</h1>
      <PostThread userId={userInfo._id.toString()} />
    </>
  );
}

export default CreateThread;
