import styles from "./TechnologyBadge.module.scss";
import type { Technology } from "models/technology";

const TechnologyBadge = ({ name, type }: Technology) => {
  return <span className={`${styles.badge} ${styles[type.toLowerCase()]}`}>{name}</span>;
};

export default TechnologyBadge;
