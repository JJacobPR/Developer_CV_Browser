import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Spinner from "../../../ui/Spinner/Spinner";
import styles from "./ProjectList.module.scss";
import { useEffect } from "react";
import { fetchProjects } from "@store/projectsSlice";
import ProjectCard from "../projectCard/ProjectCard";

const ProjectList = () => {
  const dispatch = useAppDispatch();
  const { projects, status } = useAppSelector((state) => state.projectSlice);

  useEffect(() => {
    if (status === "IDLE") dispatch(fetchProjects());
  }, [status, dispatch]);

  return (
    <>
      {status === "LOADING" && <Spinner size={40} />}
      {status === "SUCCESS" && projects.length > 0 && (
        <div className={styles["projects"]}>
          {projects.map((project, index) => (
            <div key={project.projectId}>
              <ProjectCard project={project} />
              {index < projects.length - 1 && <hr className={styles["divider"]} />}
            </div>
          ))}
        </div>
      )}
      {status === "SUCCESS" && projects.length === 0 && <p>No projects found.</p>}
      {status === "ERROR" && <p>Something went wrong while fetching projects.</p>}
    </>
  );
};

export default ProjectList;
