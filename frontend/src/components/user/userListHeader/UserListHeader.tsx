import styles from "./UserListHeader.module.scss";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import type { Technology } from "models/Technology";

type Props = {
  onFilterChange: (filters: { technology: string; projectRole: string; projectName: string }) => void;
};

const UserListHeader = ({ onFilterChange }: Props) => {
  const [technology, setTechnology] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectName, setProjectName] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const projectRoles = ["Frontend", "Backend", "Fullstack", "Lead", "Tester", "Cloud", "Devops", "Architect"];

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/technology`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch technologies");
        }
        const data = await response.json();
        setTechnologies(data.map((tech: Technology) => tech.name));
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchTechnologies();
  }, []);

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
