import HomeView from "@views/HomeView/HomeView";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
