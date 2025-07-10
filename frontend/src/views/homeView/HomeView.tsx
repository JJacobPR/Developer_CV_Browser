import Footer from "@components/footer/Footer";
import styles from "./HomeView.module.scss";
import Header from "@components/header/Header";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import TabMenu from "@components/tabMenu/TabMenu";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchUsers } from "@store/userSlice";
import { refreshUser } from "@store/authSlice";
import useTabs from "@hooks/useTabs";
import type { User } from "models/user";
import Spinner from "../../ui/spinner/Spinner";

const HomeView = () => {
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status: userStatus, loggedUser } = useAppSelector((state) => state.authSlice);
  const usersStatus = useAppSelector((state) => state.userSlice.status);

  // Check if the user is logged in
  useEffect(() => {
    if (userStatus === "IDLE") {
      dispatch(refreshUser());
    }
    // Fetch developers if not already loaded
    if (usersStatus === "IDLE") {
      dispatch(fetchUsers());
    }
  }, [userStatus, usersStatus, dispatch]);

  // Get tabs for the user
  const userTabs = useTabs(loggedUser as User);

  // Check if the current path matches any of the user tabs and set the active tab accordingly
  useEffect(() => {
    const currentPath = window.location.pathname.slice(1);
    if (userTabs.some((tab) => tab.value === currentPath)) {
      setActiveTab(currentPath);
    }
  }, [userTabs]);

  // Wait for the user to be logged in before rendering the view
  if (loggedUser === null) {
    return <Spinner size={40} text="Loading Data..." />;
  }

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
