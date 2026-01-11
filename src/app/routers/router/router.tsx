// src/app/router.tsx

import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Home } from "@pages/Home";
import { ReleasePage } from "@pages/ReleaseDetails";
import { Ongoings } from "@pages/AnimeList/Ongoings";
import { Announcements } from "@pages/AnimeList/Announcements";
import { Completed } from "@pages/AnimeList/Completed";
import { Movies } from "@pages/AnimeList/Movies";
import { Auth } from "@pages/Auth";
import NotFound from "../ui/NotFound";
import RootLayout from "@app/layouts/RootLayout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "release/:id", element: <ReleasePage /> },
          { path: "/ongoings", element: <Ongoings /> },
          { path: "/announcements", element: <Announcements /> },
          { path: "/completed", element: <Completed /> },
          { path: "/movies", element: <Movies /> },
          // {path: }
          // другие защищённые роуты
        ],
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
