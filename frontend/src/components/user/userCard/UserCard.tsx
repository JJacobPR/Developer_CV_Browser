import TechnologyBadge from "@components/technologyBadge/TechnologyBadge";
import styles from "./UserCard.module.scss";
import type { Technology } from "models/Technology";
import { useNavigate } from "react-router";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import type { MouseEvent } from "react";
import Modal from "../../../ui/modal/Modal";
import { hasPermission, type Role } from "../../../router/Auth";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { deleteUser } from "@store/usersSlice";

type Props = {
  id: number;
  name: string;
  surname: string;
  technologies: Technology[];
  bio: string;
};

const UserCard = ({ id, name, surname, technologies, bio }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const loggedUser = useAppSelector((state) => state.loggedUserSlice.loggedUser);

  const navigateToDetailed = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/users/${id}`);
  };

  const navigateModifyUser = (e: MouseEvent<SVGElement>): void => {
    e.stopPropagation();
    navigate(`admin/modify-user/${id}`);
  };

  const handleDeleteUser = (): void => {
    dispatch(deleteUser(id));
  };

  const openDeleteModal = (e: MouseEvent<SVGElement>): void => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <div onClick={(e) => navigateToDetailed(e)} className={styles["developer-list-item"]}>
        <div className={styles["actions"]}>
          {hasPermission({ roles: [loggedUser?.role] as Role[], id: loggedUser?.id as number }, "update:users") && <MdEdit onClick={(e) => navigateModifyUser(e)} className={styles["icon"]} />}
          {hasPermission({ roles: [loggedUser?.role] as Role[], id: loggedUser?.id as number }, "delete:users") && <MdDelete onClick={(e) => openDeleteModal(e)} className={styles["icon"]} />}
        </div>

        <div className={styles["header"]}>
          <h3>
            {name} {surname}
          </h3>
        </div>
        <div className={styles["technologies"]}>
          {technologies.map((tech) => (
            <TechnologyBadge key={tech.id} id={tech.id} name={tech.name} type={tech.type} />
          ))}
        </div>
        <p className={styles["bio"]}>{bio}</p>
      </div>
      <Modal title="Delete User" isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleDeleteUser}></Modal>
    </>
  );
};

export default UserCard;
