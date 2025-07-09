import Projects from "@components/projects/projects/Projects";
import UserForm from "@components/user/userForm/UserForm";
import UserList from "@components/user/userList/UserList";
import HomeView from "@views/homeView/HomeView";
import LoginView from "@views/loginView/LoginView";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Authorized from "./AuthorizedRoute";
import AddProject from "@components/projects/addProject/AddProject";
import ModifyProject from "@components/projects/modifyProject/ModifyProject";
import AddUser from "@components/user/addUser/AddUser";
import ModifyUser from "@components/user/modifyUser/ModifyUser";
import ErrorView from "@views/errorView/errorView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "/",
        element: <HomeView />,
        children: [
          {
            path: "",
            element: <UserList />,
          },
          {
            path: "users/:userId",
            element: <Projects />,
          },
          {
            path: "my-projects",
            element: <Authorized child={<Projects />} role={"USER"} />,
          },
          {
            path: "my-projects/add-project",
            element: <Authorized child={<AddProject />} role={"USER"} />,
          },
          {
            path: "my-projects/modify-project/:projectId",
            element: <Authorized child={<ModifyProject />} role={"USER"} />,
          },
          {
            path: "admin/add-user",
            element: <Authorized child={<AddUser />} role={"ADMIN"} />,
          },
          {
            path: "admin/modify-user/:userId",
            element: <Authorized child={<ModifyUser />} role={"ADMIN"} />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    errorElement: <ErrorView />,
  },
]);

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
