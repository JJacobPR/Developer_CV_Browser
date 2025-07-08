import Spinner from "../../../ui/spinner/Spinner";
import styles from "./ProjectList.module.scss";
import ProjectCard from "../projectCard/ProjectCard";
import type { Project } from "models/Project";
import type { Status } from "models/Utils";

type ProjectListProps = {
  projects: Project[];
  status: Status;
};

const ProjectList = ({ projects, status }: ProjectListProps) => {
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
