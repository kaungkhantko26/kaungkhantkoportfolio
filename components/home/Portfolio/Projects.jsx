import styles from "./Projects.module.css";
import Project from "./Project";

const projects = require('../../../store/projects.json');

export default function Projects() {
  return (
    <div className={styles.projects}>
      <h3 className={styles.title}>Featured Projects</h3>
      <div className={styles.wrapper}>
        {projects.map((p) => (
          <Project project={p} key={p.number} />
        ))}
        <div className={styles.cover}>
          <div>
            <div className={styles.inner} />
          </div>
        </div>
        <div className={styles.cover}>
          <div>
            <div className={styles.inner} />
          </div>
        </div>
      </div>
    </div>
  );
}
