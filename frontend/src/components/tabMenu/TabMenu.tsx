import type { TabMenuProps } from "models/tab";
import styles from "./TabMenu.module.scss";
import { useNavigation } from "react-router";

const TabMenu = ({ tabs, activeTab, onTabChange, className = "" }: TabMenuProps) => {
  const navigation = useNavigation();

  return (
    <nav className={`${styles["tab-menu"]} ${className}`}>
      {tabs.map((tab) => (
        <button key={tab.value} className={`${styles["tab-menu__tab"]} ${activeTab === tab.value ? styles["tab-menu__tab--active"] : ""}`} onClick={() => onTabChange(tab.value)}>
          {navigation.state === "loading" ? "Loading..." : tab.label}
        </button>
      ))}
    </nav>
  );
};

export default TabMenu;
