// src/app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute.tsx/ui/ProtectedRoute";
import Home from "@/pages/Home/ui/Home";
import Auth from "@/pages/Auth/ui/Auth";
import RootLayout from "@/app/layouts/RootLayout/ui/RootLayout";
import NotFound from "@/app/ui/NotFound";
import AnimePage from "@/pages/AnimePage/ui/AnimePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "release/:id", 
        element: <AnimePage />,
      },
    ],
  },

  {
    path: "/auth",
    element: <Auth />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
