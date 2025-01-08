import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(id);
  //  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section className="mt-9 flex flex-col gap-10">
      <ProfileHeader
        accountId={userInfo._id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="text-dark-100 max-mobile:hidden">{tab.label}</p>
                {tab.value === "threads" && (
                  <p className="text-dark-100 bg-brand-green-light_100 ml-1 rounded-full px-1.5 text-sm font-medium">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.value}`}
              value={tab.value}
              className="text-dark-100 w-full"
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default page;
