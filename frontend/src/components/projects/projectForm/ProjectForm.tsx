import { useForm, Controller } from "react-hook-form";
import styles from "./ProjectForm.module.scss";
import { useEffect, useState } from "react";
import type { ProjectRequest } from "models/Project";
import type { Technology } from "models/Technology";
import { API_URL } from "../../../config";

type ProjectFormProps = {
  initialData?: Partial<ProjectRequest>;
};

const ProjectForm = ({ initialData }: ProjectFormProps) => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectRequest>({
    defaultValues: {
      userId: 1,
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

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/technology`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch technologies");
        }
        const data = await response.json();
        setTechnologies(data);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchTechnologies();
  }, []);

  const selectedTechs = watch("technologies");

  const toggleTechnology = (techId: number) => {
    const current = new Set(selectedTechs);
    if (current.has(techId)) {
      current.delete(techId);
    } else {
      current.add(techId);
    }
    setValue("technologies", Array.from(current));
  };

  return (
    <form className={styles["project-form"]}>
      <div className={styles["form-group"]}>
        <label>Project Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span className={styles.error}>Name is required</span>}
      </div>

      <div className={styles["form-group"]}>
        <label>Company Name</label>
        <input {...register("companyName", { required: true })} />
        {errors.companyName && <span className={styles.error}>Company is required</span>}
      </div>

      <div className={styles["form-group"]}>
        <label>Role</label>
        <input {...register("projectRole", { required: true })} />
        {errors.projectRole && <span className={styles.error}>Role is required</span>}
      </div>

      <div className={styles["form-group"]}>
        <label>Description</label>
        <textarea {...register("description", { required: true })} />
        {errors.description && <span className={styles.error}>Description is required</span>}
      </div>

      <div className={styles["form-group"]}>
        <label>Start Date</label>
        <input type="date" {...register("startDate", { required: true })} />
        {errors.startDate && <span className={styles.error}>Start date is required</span>}
      </div>

      <div className={styles["form-group"]}>
        <label>End Date</label>
        <input type="date" {...register("endDate", { required: true })} />
        {errors.endDate && <span className={styles.error}>End date is required</span>}
      </div>

      <div className={styles["form-group"]}>
        <label>Technologies</label>
        <div className={styles.techList}>
          {technologies.map((tech) => (
            <label key={tech.id} className={styles.techItem}>
              <input type="checkbox" checked={selectedTechs.includes(tech.id)} onChange={() => toggleTechnology(tech.id)} />
              {tech.name}
            </label>
          ))}
        </div>
        {errors.technologies && <span className={styles.error}>Select at least one tech</span>}
      </div>

      <div className={styles["form-actions"]}>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
