import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { fetchCommunityDetails } from "@/lib/actions/community.action";
import UserCard from "@/components/cards/UserCard";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const user = await currentUser();
  const community = await fetchCommunityDetails(id);

  return (
    <section className="flex flex-col gap-10">
      <ProfileHeader
        accountId={community.id}
        authUserId={user?.id || ""}
        name={community.name}
        username={community.username}
        imgUrl={community.image}
        bio={community.bio}
        type="Community"
      />
      <div className="mt-4">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
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
                  <p className="text-light-100 bg-brand-green-light_100 ml-1 size-5 items-center justify-center rounded-full text-sm font-medium">
                    {community?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads" className="text-dark-100 w-full">
            <ThreadsTab
              currentUserId={user?.id || ""}
              accountId={community._id}
              accountType="Community"
              isCommunityPage={true}
            />
          </TabsContent>
          <TabsContent value="members" className="text-dark-100 w-full">
            <section className="mt-9 flex flex-col gap-10">
              {community?.members?.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent
            value="requests"
            className="text-dark-100 w-full"
          ></TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
