import type { ProjectRequest } from "models/project";
import ProjectForm from "../projectForm/ProjectForm";
import { useAppDispatch } from "@hooks/redux";
import { addProjectToUser } from "@store/userSlice";

const AddProject = () => {
  const dispatch = useAppDispatch();

  const addProject = (data: ProjectRequest): Promise<any> => {
    return dispatch(addProjectToUser(data)).unwrap();
  };

  return <ProjectForm modalTitle={"Add New Project"} modalConfirmText={"Confirm"} onSubmit={addProject} />;
};

export default AddProject;
