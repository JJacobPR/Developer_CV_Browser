import ProjectForm from "@components/projects/projectForm/ProjectForm";
import Projects from "@components/projects/projects/Projects";
import UserForm from "@components/user/userForm/UserForm";
import UserList from "@components/user/userList/UserList";
import HomeView from "@views/homeView/HomeView";
import LoginView from "@views/loginView/LoginView";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Authorized from "./AuthorizedRoute";

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
            element: <Authorized child={<Projects />} role={"USER"} />,
          },
          {
            path: "my-projects/add-project",
            element: <ProjectForm />,
          },
          {
            path: "",
            element: <UserList />,
          },
          {
            path: "users/:userId",
            element: <Projects />,
          },
          {
            path: "admin/add-user",
            element: <Authorized child={<UserForm />} role={"ADMIN"} />,
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
