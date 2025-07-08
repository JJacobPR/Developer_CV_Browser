import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles["app-footer"]}>
      <div className={styles["footer-content"]}>
        <p>&copy; {new Date().getFullYear()} Jakub Janicki. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
