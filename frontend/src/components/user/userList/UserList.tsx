import { useAppDispatch, useAppSelector } from "@hooks/redux";
import styles from "./UserList.module.scss";
import UserCard from "../userCard/UserCard";
import { useEffect, useState, useMemo } from "react";
import { fetchDevelopers } from "@store/developersSlice";
import UserListHeader from "../userListHeader/UserListHeader";
import type { StandardUserWithProjects as Developer } from "models/User";

const UserList = () => {
  const { developers, status } = useAppSelector((state) => state.developerSlice);
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState({
    technology: "",
    projectRole: "",
    projectName: "",
  });

  useEffect(() => {
    if (status === "IDLE") {
      dispatch(fetchDevelopers());
    }
  }, [dispatch, status]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const filteredDevelopers = useMemo(() => {
    return developers.filter((dev: Developer) => {
      const techMatch = !filters.technology || dev.projects.some((project) => project.technologies.some((tech) => tech.name === filters.technology));
      const roleMatch = !filters.projectRole || dev.projects.some((project) => project.users.some((user) => user.projectRole === filters.projectRole));
      const nameMatch = !filters.projectName || dev.projects.some((project) => project.name.toLowerCase().includes(filters.projectName.toLowerCase()));
      return techMatch && roleMatch && nameMatch;
    });
  }, [developers, filters]);

  if (status === "LOADING") return <p>Loading developers...</p>;
  if (status === "ERROR") return <p>Failed to load developers.</p>;
  if (!developers || developers.length === 0) return <p>No developers found.</p>;

  return (
    <div>
      <UserListHeader technologies={["React", "Node.js", "Java"]} projectRoles={["Frontend", "Backend", "Fullstack"]} onFilterChange={handleFilterChange} />
      <div className={styles["user-list"]}>
        {filteredDevelopers.map((dev) => (
          <UserCard key={dev.id} name={dev.name} surname={dev.surname} bio={dev.bio} technologies={dev.projects.flatMap((project) => project.technologies).filter((tech, index, self) => self.findIndex((t) => t.id === tech.id) === index)} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
