import { useEffect, useState } from "react";
import { API_URL } from "../../../../config";
import styles from "./TechnologySelect.module.scss";
import type { Technology } from "models/technology";
import { useFormContext, useWatch } from "react-hook-form";
import TechnologyBadge from "@components/technologyBadge/TechnologyBadge";

type Props = {
  name: string;
};

const TechnologySelect = ({ name }: Props) => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const selectedTechs: number[] = useWatch({ control, name }) || [];

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/technology`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch technologies");
        const data = await response.json();
        setTechnologies(data);
      } catch (err) {
        console.error("Error fetching technologies:", err);
      }
    };

    fetchTechnologies();
  }, []);

  const toggleTechnology = (techId: number) => {
    const current = new Set(selectedTechs);
    if (current.has(techId)) {
      current.delete(techId);
    } else {
      current.add(techId);
    }
    setValue(name, Array.from(current));
  };

  const availableTechs = technologies.filter((tech) => !selectedTechs.includes(tech.id));
  const selected = technologies.filter((tech) => selectedTechs.includes(tech.id));

  return (
    <div className={styles["wrapper"]}>
      <label>Technologies</label>

      <div className={styles["section"]}>
        <h4>Available Technologies</h4>
        <div className={styles["techGrid"]}>
          {availableTechs.map((tech) => (
            <div key={tech.id} onClick={() => toggleTechnology(tech.id)} className={styles["badgeButton"]}>
              <TechnologyBadge name={tech.name} type={tech.type} id={tech.id} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles["section"]}>
        <h4>Selected Technologies</h4>
        <div className={styles["techGrid"]}>
          {selected.map((tech) => (
            <div key={tech.id} onClick={() => toggleTechnology(tech.id)} className={styles["badgeButton"]}>
              <TechnologyBadge name={tech.name} type={tech.type} id={tech.id} />
            </div>
          ))}
          {selected.length === 0 && <p>No technologies selected</p>}
        </div>
      </div>

      {errors[name] && <span className={styles["error"]}>Select at least one technology</span>}
    </div>
  );
};

export default TechnologySelect;
