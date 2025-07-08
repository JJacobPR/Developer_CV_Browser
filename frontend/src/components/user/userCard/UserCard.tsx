import TechnologyBadge from "@components/technologyBadge/TechnologyBadge";
import styles from "./UserCard.module.scss";
import type { Technology } from "models/Technology";
import { useNavigate } from "react-router";

type Props = {
  id: number;
  name: string;
  surname: string;
  technologies: Technology[];
  bio: string;
};

const UserCard = ({ id, name, surname, technologies, bio }: Props) => {
  const navigate = useNavigate();

  const navigateToDetailed = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/devs/${id}`);
  };

  return (
    <div onClick={(e) => navigateToDetailed(e)} className={styles["developer-list-item"]}>
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
  );
};

export default UserCard;
