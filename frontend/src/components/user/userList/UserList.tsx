import { useAppDispatch, useAppSelector } from "@hooks/redux";
import styles from "./UserList.module.scss";
import UserCard from "../userCard/UserCard";
import { useEffect, useState, useMemo } from "react";
import { fetchDevelopers } from "@store/developersSlice";
import UserListHeader from "../userListHeader/UserListHeader";
import type { StandardUserWithProjects as Developer } from "models/User";
import type { Technology } from "models/Technology";
import type { Project } from "models/Project";
import Pagination from "@components/pagination/Pagination";
import usePagination from "@hooks/usePagination";

const UserList = () => {
  const { developers, status } = useAppSelector((state) => state.developerSlice);

  const [filters, setFilters] = useState({
    technology: "",
    projectRole: "",
    projectName: "",
  });

  const filteredDevelopers = useMemo(() => {
    return developers.filter((dev: Developer) => {
      const techMatch = !filters.technology || dev.projects.some((project) => project.technologies.some((tech) => tech.name === filters.technology));
      const roleMatch = !filters.projectRole.trim() || dev.projects.some((project) => project.users.some((user) => user.projectRole.toLowerCase().includes(filters.projectRole.trim().toLowerCase())));
      const nameMatch = !filters.projectName || dev.projects.some((project) => project.name.toLowerCase().includes(filters.projectName.toLowerCase()));
      return techMatch && roleMatch && nameMatch;
    });
  }, [developers, filters]);

  const paginated = usePagination<Developer>(filteredDevelopers, 2);

  const dispatch = useAppDispatch();

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

  const getTechnologiesUser = (projects: Project[]): Technology[] => {
    return Array.from(new Map(projects.flatMap((project) => project.technologies).map((tech) => [tech.id, tech])).values());
  };

  if (status === "LOADING") return <p>Loading developers...</p>;
  if (status === "ERROR") return <p>Failed to load developers.</p>;
  if (!developers || developers.length === 0) return <p>No developers found.</p>;

  return (
    <div className={styles["user-list-container"]}>
      <UserListHeader onFilterChange={handleFilterChange} />
      <div className={styles["user-list"]}>
        {paginated.currentItems.map((dev) => (
          <UserCard key={dev.id} id={dev.id} name={dev.name} surname={dev.surname} bio={dev.bio} technologies={getTechnologiesUser(dev.projects)} />
        ))}
      </div>
      {paginated.maxPage > 1 && <Pagination currentPage={paginated.currentPage} maxPage={paginated.maxPage} onPrev={paginated.prev} onNext={paginated.next} onPageSelect={paginated.jump} />}
    </div>
  );
};

export default UserList;
