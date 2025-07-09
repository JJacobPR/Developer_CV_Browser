import { FormProvider, useForm } from "react-hook-form";
import styles from "./ProjectForm.module.scss";
import { useEffect, useState, type FormEvent } from "react";
import type { ProjectRequest } from "models/Project";
import Modal from "../../../ui/modal/Modal";
import TechnologySelect from "./technologySelect/TechnologySelect";
import { useNavigate } from "react-router";
import { useAppSelector } from "@hooks/redux";

type ProjectFormProps = {
  modalTitle: string;
  modalConfirmText: string;
  onSubmit: (data: ProjectRequest) => Promise<any>;
  initialData?: Partial<ProjectRequest>;
  modalCancelText?: string;
};

const ProjectForm = ({ modalTitle, modalConfirmText, onSubmit, initialData, modalCancelText = "Cancel" }: ProjectFormProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.loggedUserSlice.loggedUser?.id);
  const methods = useForm<ProjectRequest>({
    defaultValues: {
      userId: userId,
      name: "",
      companyName: "",
      description: "",
      projectRole: "",
      startDate: "",
      endDate: "",
      technologies: [],
      ...initialData,
    },
  });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  // Registering the technologies field with validation
  useEffect(() => {
    register("technologies", {
      validate: (value) => (Array.isArray(value) && value.length > 0) || "Select at least one technology",
    });
  });

  const openModal = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    handleSubmit(() => setModalOpen(true))();
  };

  const submitForm = async () => {
    const formData = getValues();

    // Fix date format before submission
    const formattedData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };

    try {
      await onSubmit(formattedData);

      setModalOpen(false);
      navigate("/my-projects");
    } catch (err) {
      console.error("Failed to submit project:", err);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={openModal} className={styles["project-form"]}>
          <div className={styles["form-group"]}>
            <label>Project Name</label>
            <input {...register("name", { required: true })} />
            {errors.name && <span className={styles["error"]}>Name is required</span>}
          </div>

          <div className={styles["form-group"]}>
            <label>Company Name</label>
            <input {...register("companyName", { required: true })} />
            {errors.companyName && <span className={styles["error"]}>Company is required</span>}
          </div>

          <div className={styles["form-group"]}>
            <label>Role</label>
            <input {...register("projectRole", { required: true })} />
            {errors.projectRole && <span className={styles["error"]}>Role is required</span>}
          </div>

          <div className={styles["form-group"]}>
            <label>Description</label>
            <textarea {...register("description", { required: true })} />
            {errors.description && <span className={styles["error"]}>Description is required</span>}
          </div>

          <div className={styles["form-group"]}>
            <label>Start Date</label>
            <input
              type="date"
              {...register("startDate", {
                required: "Start date is required",
                //Custom validation to ensure end date is after start date
                validate: (value) => {
                  const start = new Date(value);
                  const end = new Date(getValues("endDate"));
                  console.log("Start Date:", start, "End Date:", end);
                  if (isNaN(start.getTime()) || isNaN(end.getTime())) return true;
                  return end >= start || "End date must be after start date";
                },
              })}
            />
            {errors.startDate && <span className={styles["error"]}>{errors.startDate.message}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label>End Date</label>
            <input type="date" {...register("endDate", { required: true })} />
            {errors.endDate && <span className={styles["error"]}>End date is required</span>}
          </div>

          <TechnologySelect name="technologies" />

          <div className={styles["form-actions"]}>
            <button type="submit" className={styles["submit"]}>
              Submit
            </button>
          </div>
        </form>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} confirmText={modalConfirmText} cancelText={modalCancelText} onConfirm={submitForm} />
      </FormProvider>
    </>
  );
};

export default ProjectForm;
