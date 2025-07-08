import Footer from "@components/footer/Footer";
import styles from "./HomeView.module.scss";
import Header from "@components/header/Header";
import { Outlet, useNavigate } from "react-router";
import { useState } from "react";
import TabMenu from "@components/tabMenu/TabMenu";
import { useAppDispatch } from "@hooks/redux";
import { fetchDevelopers } from "@store/developersSlice";

const userTabs = [
  { label: "Developers", value: "devs" },
  { label: "My Projects", value: "my-projects" },
];

const HomeView = () => {
  const [activeTab, setActiveTab] = useState("devs");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  dispatch(fetchDevelopers());

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className={styles["home-view"]}>
      <Header />
      <div className={styles["content-wrapper"]}>
        <TabMenu className={styles["tab-menu"]} tabs={userTabs} activeTab={activeTab} onTabChange={changeTab} />
        <div className={styles["outlet-wrapper"]}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeView;
