import { Tabs, TabsList, TabsTrigger } from "@shared/shadcn/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

const TABS = [
  { value: "mytab", to: "/mytab", label: "Моя страница" },
  { value: "home", to: "/", label: "Последнее" },
  { value: "ongoings", to: "/ongoings", label: "Онгоинги" },
  { value: "announcements", to: "/announcements", label: "Анонсы" },
  { value: "completed", to: "/completed", label: "Завершенные" },
  { value: "movies", to: "/movies", label: "Фильмы" },
];

const getActiveTab = (pathname: string): string => {
  const match = TABS.find((tab) => tab.to === pathname);
  return match?.value ?? "home";
};

const Tab = () => {
  const { pathname } = useLocation();

  return (
    <Tabs value={getActiveTab(pathname)} className="w-full">
      <TabsList>
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            <Link to={tab.to}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default Tab;
