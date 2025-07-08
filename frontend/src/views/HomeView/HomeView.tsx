import Footer from "@components/footer/Footer";
import styles from "./HomeView.module.scss";
import Header from "@components/header/Header";
import { Outlet } from "react-router";
import { useState } from "react";
import TabMenu from "@components/tabMenu/TabMenu";
import { useAppDispatch } from "@hooks/redux";
import { loginUser } from "@store/userSlice";
import { fetchProjects } from "@store/projectsSlice";
import { fetchDevelopers } from "@store/developersSlice";

const userTabs = [
  { label: "Developers", value: "all" },
  { label: "My CV", value: "frontend" },
];

const HomeView = () => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useAppDispatch();
  dispatch(fetchDevelopers());
  // const handleLoginAndFetchProjects = async () => {
  //   const resultAction = await dispatch(
  //     loginUser({
  //       email: "example@email.com",
  //       password: "password123",
  //     })
  //   );

  //   // Check if login was successful before dispatching next action
  //   if (loginUser.fulfilled.match(resultAction)) {
  //     dispatch(fetchProjects());
  //   } else {
  //     console.error("Login failed, not fetching projects.");
  //   }
  // };

  // handleLoginAndFetchProjects();
  return (
    <div className={styles["home-view"]}>
      <Header />
      <div className={styles["content-wrapper"]}>
        <TabMenu className={styles["tab-menu"]} tabs={userTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className={styles["outlet-wrapper"]}>
          <p>List view will be here...</p>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeView;
