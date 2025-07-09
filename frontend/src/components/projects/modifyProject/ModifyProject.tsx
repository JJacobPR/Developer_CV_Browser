import type { ProjectRequest } from "models/Project";
import ProjectForm from "../projectForm/ProjectForm";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { modifyUserProject } from "@store/usersSlice";
import { useParams } from "react-router";

const ModifyProject = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const { users } = useAppSelector((state) => state.usersSlice);
  const { loggedUser } = useAppSelector((state) => state.loggedUserSlice);
  const currentUser = users.find((user) => user.id === loggedUser?.id);
  const project = currentUser?.projects.find((project) => project.projectId === Number(projectId));

  const formatDateToLocalYYYYMMDD = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const initialProject: ProjectRequest = {
    userId: loggedUser?.id || 0,
    name: project?.name || "",
    companyName: project?.companyName || "",
    description: project?.description || "",
    projectRole: project?.users.find((user) => user.id === loggedUser?.id)?.projectRole || "",
    startDate: project ? formatDateToLocalYYYYMMDD(project.startDate) : "",
    endDate: project ? formatDateToLocalYYYYMMDD(project.endDate) : "",
    technologies: project?.technologies.map((tech) => tech.id) || [],
  };

  const modifyProject = (data: ProjectRequest): Promise<any> => {
    if (!projectId) {
      return Promise.reject(new Error("Project ID is undefined"));
    }
    return dispatch(modifyUserProject({ id: +projectId, projectRequest: data })).unwrap();
  };

  return <ProjectForm modalTitle={"Modify Project"} modalConfirmText={"Confirm"} onSubmit={modifyProject} initialData={initialProject} />;
};

export default ModifyProject;
