import { useAppDispatch } from "@hooks/redux";
import UserForm from "../userForm/UserForm";
import type { StandardUserRequest } from "models/User";
import { addUser as addUserSlice } from "@store/usersSlice";

const AddUser = () => {
  const dispatch = useAppDispatch();

  const addUser = (data: StandardUserRequest): Promise<any> => {
    return dispatch(addUserSlice(data)).unwrap();
  };

  return <UserForm modalTitle={"Add user"} modalConfirmText={"Confirm"} onSubmit={addUser} />;
};

export default AddUser;
