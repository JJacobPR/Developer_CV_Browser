import styles from "./Spinner.module.scss";

type Props = {
  size?: number;
  text?: string; // Optional text to display with the spinner
};

const Spinner = ({ size = 40, text = "Loading..." }: Props) => {
  return (
    <div className={styles["spinner"]}>
      <div style={{ width: size, height: size }} />
      <p>{text}</p>
    </div>
  );
};

export default Spinner;
