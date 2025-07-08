import { useAppDispatch, useAppSelector } from "@hooks/redux";
import styles from "./UserList.module.scss";
import UserCard from "../userCard/UserCard";
import { useEffect, useState, useMemo } from "react";
import { fetchUsers } from "@store/usersSlice";
import UserListHeader from "../userListHeader/UserListHeader";
import type { StandardUserWithProjects } from "models/User";
import type { Technology } from "models/Technology";
import type { Project } from "models/Project";
import Pagination from "@components/pagination/Pagination";
import usePagination from "@hooks/usePagination";
import Spinner from "../../../ui/spinner/Spinner";

const UserList = () => {
  const { users, status } = useAppSelector((state) => state.usersSlice);

  const [filters, setFilters] = useState({
    technology: "",
    projectRole: "",
    projectName: "",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user: StandardUserWithProjects) => {
      const techMatch = !filters.technology || user.projects.some((project) => project.technologies.some((tech) => tech.name === filters.technology));
      const roleMatch = !filters.projectRole.trim() || user.projects.some((project) => project.users.some((user) => user.projectRole.toLowerCase().includes(filters.projectRole.trim().toLowerCase())));
      const nameMatch = !filters.projectName || user.projects.some((project) => project.name.toLowerCase().includes(filters.projectName.toLowerCase()));
      return techMatch && roleMatch && nameMatch;
    });
  }, [users, filters]);

  const paginated = usePagination<StandardUserWithProjects>(filteredUsers, 2);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const getTechnologiesUser = (projects: Project[]): Technology[] => {
    return Array.from(new Map(projects.flatMap((project) => project.technologies).map((tech) => [tech.id, tech])).values());
  };

  if (status === "LOADING") return <Spinner size={40} />;
  if (status === "ERROR") return <p>Failed to load users.</p>;
  if (status === "SUCCESS" && users.length === 0) return <p>No users found.</p>;

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
