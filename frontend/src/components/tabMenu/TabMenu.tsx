import type { TabMenuProps } from "models/tab";
import styles from "./TabMenu.module.scss";

const TabMenu = ({ tabs, activeTab, onTabChange, className = "" }: TabMenuProps) => {
  return (
    <nav className={`${styles["tab-menu"]} ${className}`}>
      {tabs.map((tab) => (
        <button key={tab.value} className={`${styles["tab-menu__tab"]} ${activeTab === tab.value ? styles["tab-menu__tab--active"] : ""}`} onClick={() => onTabChange(tab.value)}>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default TabMenu;
