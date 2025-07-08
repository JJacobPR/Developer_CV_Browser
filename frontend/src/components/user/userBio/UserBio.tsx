import styles from "./UserBio.module.scss";

type UserBioProps = {
  id: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  workRole: string;
  bio: string;
};

const UserBio = ({ name, surname, email, phoneNumber, workRole, bio }: UserBioProps) => {
  return (
    <div className={styles["user-bio"]}>
      <h2 className={styles["name"]}>
        {name} {surname}
      </h2>
      <p className={styles["role"]}>{workRole}</p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phoneNumber}
      </p>
      <p className={styles["bio"]}>
        <strong>Bio:</strong> {bio}
      </p>
    </div>
  );
};

export default UserBio;
