import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { loginUser } from "@store/userSlice";
import { useParams } from "react-router";
import ContentWrapper from "../../../ui/contentWrapper/ContentWrapper";
import UserBio from "@components/user/userBio/UserBio";
import ProjectList from "../projectList/ProjectList";
import type { StandardUserWithProjects } from "models/User";

const Projects = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();

  const { user, status } = useAppSelector((state) => state.userSlice);
  const { developers } = useAppSelector((state) => state.developerSlice);

  useEffect(() => {
    if (status === "IDLE") {
      dispatch(
        loginUser({
          email: "",
          password: "",
        })
      );
    }
  }, [dispatch, status]);

  // If there's a userId param, find that user in developers
  const resolvedUser = (userId ? developers.find((dev) => dev.id === Number(userId)) : developers.find((dev) => dev.id === Number(user?.id))) as StandardUserWithProjects | null;

  if (!resolvedUser) return null;

  return (
    <ContentWrapper>
      <UserBio id={resolvedUser.id} email={resolvedUser.email} name={resolvedUser.name} surname={resolvedUser.surname} phoneNumber={resolvedUser.phoneNumber} workRole={resolvedUser.workRole} bio={resolvedUser.bio} />
      <ProjectList projects={resolvedUser.projects} status={status} />
    </ContentWrapper>
  );
};

export default Projects;
