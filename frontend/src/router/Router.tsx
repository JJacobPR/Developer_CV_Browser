import ProjectForm from "@components/projects/projectForm/ProjectForm";
import Projects from "@components/projects/projects/Projects";
import UserForm from "@components/user/userForm/UserForm";
import UserList from "@components/user/userList/UserList";
import HomeView from "@views/homeView/HomeView";
import LoginView from "@views/loginView/LoginView";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
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
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
]);

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
