import { Tabs, TabsList, TabsTrigger } from "@shared/shadcn/components/ui/tabs";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Tab = () => {
  return (
   <Tabs defaultValue="home" className="w-full">
  <TabsList>
    <TabsTrigger value="myTab">
      <Link to={'/mytab'} >
        Моя страница
      </Link>
      </TabsTrigger>
    <TabsTrigger value="home">
      <Link to={'/'} >
        Последнее
      </Link>
    </TabsTrigger>
    <TabsTrigger value="ongoings">
      <Link to={'/ongoings'} >
        Онгоинги
      </Link>
    </TabsTrigger>
    <TabsTrigger value="announcements">
      <Link to={'/announcements'} >
        Анонсы
      </Link>
    </TabsTrigger>
    <TabsTrigger value="completed">
      <Link to={'/completed'} >
        Завершенные
      </Link>
    </TabsTrigger>
    <TabsTrigger value="movies">
      <Link to={'/movies'} >
        Фильмы
      </Link>
    </TabsTrigger>
  </TabsList>
</Tabs>
  );
};

export default Tab;
