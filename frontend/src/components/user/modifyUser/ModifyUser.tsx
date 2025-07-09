import { useAppDispatch, useAppSelector } from "@hooks/redux";
import UserForm from "../userForm/UserForm";
import type { StandardUserRequest } from "models/user";
import { modifyUser as modifyUserSlice } from "@store/userSlice";
import { useParams } from "react-router";

const ModifyUser = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const user = useAppSelector((state) => state.userSlice.users.find((user) => user.id === Number(userId)));

  const modifyUser = (data: StandardUserRequest): Promise<any> => {
    return dispatch(modifyUserSlice({ id: Number(userId), userRequest: data })).unwrap();
  };

  const initialUser = {
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    name: user?.name || "",
    surname: user?.surname || "",
    phoneNumber: user?.phoneNumber || "",
    workRole: user?.workRole || "",
    bio: user?.bio || "",
  };

  return <UserForm modalTitle={"Modify user"} modalConfirmText={"Confirm"} onSubmit={modifyUser} initialData={initialUser} />;
};

export default ModifyUser;
