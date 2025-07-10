import { useAppSelector } from "@hooks/redux";
import { useParams } from "react-router";
import ContentWrapper from "../../../ui/contentWrapper/ContentWrapper";
import UserBio from "@components/user/userBio/UserBio";
import ProjectList from "../projectList/ProjectList";
import type { StandardUserWithProjects } from "models/user";

const Projects = () => {
  const { userId } = useParams();
  const { users, status } = useAppSelector((state) => state.userSlice);
  const id = useAppSelector((state) => state.authSlice.loggedUser?.id);

  // If there's a userId param, find that user in developers
  const resolvedUser = users.find((user) => (userId ? user.id === Number(userId) : user.id === id)) as StandardUserWithProjects | null;
  if (!resolvedUser) return null;

  return (
    <ContentWrapper>
      <UserBio id={resolvedUser.id} email={resolvedUser.email} name={resolvedUser.name} surname={resolvedUser.surname} phoneNumber={resolvedUser.phoneNumber} workRole={resolvedUser.workRole} bio={resolvedUser.bio} />
      <ProjectList projects={resolvedUser.projects} status={status} isOwner={userId === undefined} />
    </ContentWrapper>
  );
};

export default Projects;
