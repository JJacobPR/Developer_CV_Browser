import type { Project } from "models/Project";
import styles from "./ProjectCard.module.scss";
import TechnologyBadge from "@components/technologyBadge/TechnologyBadge";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import { useState, type MouseEvent } from "react";
import Modal from "../../../ui/modal/Modal";
import { useAppDispatch } from "@hooks/redux";
import { deleteUserProject } from "@store/usersSlice";

interface ProjectProps {
  project: Project;
  isOwner?: boolean;
}

const ProjectCard = ({ project, isOwner }: ProjectProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const navigateModifyProject = (e: MouseEvent<SVGElement>): void => {
    e.stopPropagation();
    navigate(`/my-projects/modify-project/${project.projectId}`);
  };

  const handleDeleteProject = (): void => {
    dispatch(deleteUserProject(project.projectId));
  };

  const openDeleteModal = (e: MouseEvent<SVGElement>): void => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles["container"]}>
        {isOwner && (
          <div className={styles["actions"]}>
            <MdEdit onClick={(e) => navigateModifyProject(e)} className={styles["icon"]} />
            <MdDelete onClick={(e) => openDeleteModal(e)} className={styles["icon"]} />
          </div>
        )}
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
      <Modal title="Delete Project" isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleDeleteProject}></Modal>
    </>
  );
};

export default ProjectCard;
