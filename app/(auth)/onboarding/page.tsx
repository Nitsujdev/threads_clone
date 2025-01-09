import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Jersey_10 } from "next/font/google";
import { redirect } from "next/navigation";

async function OnboardingPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userInfo = await fetchUser(user?.id);
  if (!userInfo?.onboarded) redirect("/dashboard");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName,
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-center">
      <h1 className="text-foreground text-2xl font-bold">Onboarding</h1>
      <p className="text-foreground mt-3 text-base">
        Complete your profile to get started
      </p>
      <section className="bg-light-200 mt-6 rounded-lg p-10 ">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default OnboardingPage;
