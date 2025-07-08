import { useForm } from "react-hook-form";
import styles from "./UserForm.module.scss";
import { useState, type FormEvent } from "react";
import Modal from "../../../ui/modal/Modal";

type AddUserFormProps = {
  initialData?: AddUserFormInputs;
};

export type AddUserFormInputs = {
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
  email: string;
  phoneNumber: string;
  workRole: string;
  bio: string;
};

const UserForm = ({ initialData }: AddUserFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormInputs>({
    defaultValues: initialData || {
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      workRole: "",
      bio: "",
    },
  });

  const openModal = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <form onSubmit={(e) => openModal(e)} className={styles["user-form"]}>
        <div className={styles["form-group"]}>
          <label>Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <span className={styles.error}>Name is required</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Surname</label>
          <input {...register("surname", { required: true })} />
          {errors.surname && <span className={styles.error}>Surname is required</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Email</label>
          <input {...register("email", { required: true })} type="email" />
          {errors.email && <span className={styles.error}>Email is required</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Password</label>
          <input {...register("password", { required: true })} type="password" />
          {errors.email && <span className={styles.error}>Password is required</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Confirm Password</label>
          <input {...register("confirmPassword", { required: true })} type="password" />
          {errors.email && <span className={styles.error}>Passwords must match</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Phone Number</label>
          <input {...register("phoneNumber", { required: true })} />
          {errors.phoneNumber && <span className={styles.error}>Phone number is required</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Work Role</label>
          <input {...register("workRole", { required: true })} />
          {errors.workRole && <span className={styles.error}>Work role is required</span>}
        </div>

        <div className={styles["form-group"]}>
          <label>Bio</label>
          <textarea {...register("bio", { required: true })} />
          {errors.bio && <span className={styles.error}>Bio is required</span>}
        </div>

        <div className={styles["form-actions"]}>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
      </form>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm User Creation"
        confirmText="Create User"
        cancelText="Cancel"
        onConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      ;
    </>
  );
};

export default UserForm;
