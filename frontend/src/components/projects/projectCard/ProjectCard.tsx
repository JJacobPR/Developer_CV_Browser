import type { Project } from "models/Project";
import styles from "./ProjectCard.module.scss";
import TechnologyBadge from "@components/technologyBadge/TechnologyBadge";

interface ProjectProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h2>{project.name}</h2>
        <span>{project.companyName}</span>
        <span>{project.users[0].projectRole}</span>
      </div>
      <p className={styles["period"]}>
        {new Date(project.startDate).toLocaleDateString()}-{new Date(project.endDate).toLocaleDateString()}
      </p>
      <p className={styles["description"]}>{project.description}</p>
      <div className={styles["technologies"]}>
        <h4>Technologies</h4>
        <div className={styles["badges"]}>
          {project.technologies.map((tech) => (
            <TechnologyBadge key={tech.id} id={tech.id} name={tech.name} type={tech.type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
