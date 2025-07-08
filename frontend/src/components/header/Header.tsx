import styles from "./Header.module.scss";
import logo from "@img/logo.png";

const Header = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <header className={styles["app-header"]}>
      <div className={styles["header-left"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={logo} alt="Logo" className={styles["logo-img"]} />
        </div>
      </div>
      <div className={styles["header-right"]}>
        <button className={styles["logout-button"]} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
