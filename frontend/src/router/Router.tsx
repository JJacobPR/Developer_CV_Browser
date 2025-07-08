import ProjectForm from "@components/projects/projectForm/ProjectForm";
import Projects from "@components/projects/projects/Projects";
import UserForm from "@components/user/userForm/UserForm";
import UserList from "@components/user/userList/UserList";
import HomeView from "@views/homeView/HomeView";
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
        path: "my-projects/add-project",
        element: <ProjectForm />,
      },
      {
        path: "devs",
        element: <UserList />,
      },
      {
        path: "devs/:userId",
        element: <Projects />,
      },
      {
        path: "admin/add-user",
        element: <UserForm />,
      },
    ],
  },
]);

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
