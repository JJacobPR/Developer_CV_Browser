import TechnologyBadge from "@components/technologyBadge/TechnologyBadge";
import styles from "./UserCard.module.scss";
import type { Technology } from "models/Technology";

type Props = {
  name: string;
  surname: string;
  technologies: Technology[];
  bio: string;
};

const UserCard = ({ name, surname, technologies, bio }: Props) => {
  return (
    <div className={styles["developer-list-item"]}>
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
