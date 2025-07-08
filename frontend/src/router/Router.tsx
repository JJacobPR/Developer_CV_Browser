import Projects from "@components/projects/projects/Projects";
import UserList from "@components/user/userList/UserList";
import HomeView from "@views/HomeView/HomeView";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    children: [
      {
        path: "my-projects",
        element: <Projects />,
      },
      {
        path: "devs",
        element: <UserList />,
      },
    ],
  },
]);

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
