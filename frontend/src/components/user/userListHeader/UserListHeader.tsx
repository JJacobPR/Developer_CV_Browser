import styles from "./UserListHeader.module.scss";
import { useState, useEffect } from "react";

type Props = {
  technologies: string[];
  projectRoles: string[];
  onFilterChange: (filters: { technology: string; projectRole: string; projectName: string }) => void;
};

const UserListHeader = ({ technologies, projectRoles, onFilterChange }: Props) => {
  const [technology, setTechnology] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    onFilterChange({ technology, projectRole, projectName });
  }, [technology, projectRole, projectName]);

  return (
    <div className={styles["user-list-header"]}>
      <input type="text" placeholder="Search by project name..." value={projectName} onChange={(e) => setProjectName(e.target.value)} />

      <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
        <option value="">All Technologies</option>
        {technologies.map((tech) => (
          <option key={tech} value={tech}>
            {tech}
          </option>
        ))}
      </select>

      <select value={projectRole} onChange={(e) => setProjectRole(e.target.value)}>
        <option value="">All Roles</option>
        {projectRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserListHeader;
