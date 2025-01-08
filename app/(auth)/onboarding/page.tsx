import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

async function OnboardingPage() {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-center">
      <h1 className="text-2xl font-bold text-foreground">Onboarding</h1>
      <p className="mt-3 text-base text-foreground">
        Complete your profile to get started
      </p>
      <section className="mt-6 rounded-lg bg-light-200 p-10 ">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default OnboardingPage;
