import ContentWrapper from "../../../ui/ContentWrapper/ContentWrapper";
import styles from "./Projects.module.scss";
import UserBio from "@components/user/userBio/UserBio";
import ProjectList from "../projectList/ProjectList";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import type { StandardUser } from "models/User";
import { useEffect } from "react";
import { loginUser } from "@store/userSlice";

const Projects = () => {
  const { user, status } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "IDLE")
      dispatch(
        loginUser({
          email: "",
          password: "",
        })
      );
  });

  if (!user || user.role !== "USER") return null;

  const standardUser = user as StandardUser;

  return (
    <ContentWrapper>
      <UserBio id={standardUser.id} email={standardUser.email} name={standardUser.name} surname={standardUser.surname} phoneNumber={standardUser.phoneNumber} workRole={standardUser.workRole} bio={standardUser.bio} />
      <ProjectList />
    </ContentWrapper>
  );
};

export default Projects;
