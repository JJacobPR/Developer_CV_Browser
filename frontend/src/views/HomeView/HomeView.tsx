import Footer from "@components/footer/Footer";
import styles from "./HomeView.module.scss";
import Header from "@components/header/Header";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import TabMenu from "@components/tabMenu/TabMenu";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchUsers } from "@store/usersSlice";
import { refreshUser } from "@store/loggedUserSlice";

const userTabs = [
  { label: "Users", value: "" },
  { label: "My Projects", value: "my-projects" },
];

const HomeView = () => {
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userStatus = useAppSelector((state) => state.loggedUserSlice.status);
  const usersStatus = useAppSelector((state) => state.usersSlice.status);

  // Check if the current path matches any of the user tabs and set the active tab accordingly
  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1];
    if (userTabs.some((tab) => tab.value === currentPath)) {
      setActiveTab(currentPath);
    }
  });

  useEffect(() => {
    if (userStatus === "IDLE") {
      dispatch(refreshUser());
    }
    // Fetch developers if not already loaded
    if (usersStatus === "IDLE") {
      dispatch(fetchUsers());
    }
  }, [userStatus, usersStatus]);

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
