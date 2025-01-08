export const sidebarLinks = [
    {
      imgURL: "/icons/home.svg",
      route: "/dashboard",
      label: "Dashboard",
    },
    {
      imgURL: "/icons/search.svg",
      route: "/dashboard/search",
      label: "Search",
    },
    {
      imgURL: "/icons/heart.svg",
      route: "/dashboard/activity",
      label: "Activity",
    },
    {
      imgURL: "/icons/create.svg",
      route: "/dashboard/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: "/icons/community.svg",
      route: "/dashboard/communities",
      label: "Communities",
    },
    {
      imgURL: "/icons/user.svg",
      route: "/dashboard/profile/...",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/icons/reply.svg" },
    { value: "replies", label: "Replies", icon: "/icons/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/icons/tag.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/icons/reply.svg" },
    { value: "members", label: "Members", icon: "/icons/members.svg" },
    { value: "requests", label: "Requests", icon: "/icons/request.svg" },
  ];