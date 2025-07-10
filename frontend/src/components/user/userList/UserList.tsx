import { useAppSelector } from "@hooks/redux";
import styles from "./UserList.module.scss";
import UserCard from "../userCard/UserCard";
import { useState, useMemo } from "react";
import UserListHeader from "../userListHeader/UserListHeader";
import type { StandardUserWithProjects } from "models/user";
import type { Technology } from "models/technology";
import type { Project } from "models/project";
import Pagination from "@components/pagination/Pagination";
import usePagination from "@hooks/usePagination";
import Spinner from "../../../ui/spinner/Spinner";

const UserList = () => {
  const { users, status } = useAppSelector((state) => state.userSlice);

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

  return (
    <>
      {status === "LOADING" && <Spinner size={40} />}
      {status === "ERROR" && <p>Failed to load users.</p>}
      {status === "SUCCESS" && users.length === 0 && <p>No users found.</p>}
      {status === "SUCCESS" && users.length > 0 && (
        <div className={styles["user-list-container"]}>
          <UserListHeader onFilterChange={handleFilterChange} />
          <div className={styles["user-list"]}>
            {paginated.currentItems.map((dev) => (
              <UserCard key={dev.id} id={dev.id} name={dev.name} surname={dev.surname} bio={dev.bio} technologies={getTechnologiesUser(dev.projects)} />
            ))}
          </div>
          {paginated.maxPage > 1 && <Pagination currentPage={paginated.currentPage} maxPage={paginated.maxPage} onPrev={paginated.prev} onNext={paginated.next} onPageSelect={paginated.jump} />}
        </div>
      )}
    </>
  );
};

export default UserList;
