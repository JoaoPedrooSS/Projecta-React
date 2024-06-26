import { useLocation, useNavigate } from "react-router-dom";
import Message from "../Layout/Message";
import { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import Container from "../Layout/Container";
import LinkButton from "../Layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../Layout/Loading";

function Projects() {
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectMessage, setProjectMessage] = useState("")

  const location = useLocation();
  const message = location.state && location.state.message;

  useEffect(() => {
    setTimeout(
        () => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((resp) => resp.json())
                .then((data) => {
                  setProjects(data)
                  setRemoveLoading(true)
              })
                .catch((err) => console.log(err)); 
        }, 300)
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resp => resp.json()).then(data => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage("Project removed successfully!")
    }).catch((err) => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.tittle_container}>
        <h1>My Projects</h1>
        <LinkButton to="/NewProject" text="Create new Project" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
          {!removeLoading && <Loading/>}
          {removeLoading && projects.length === 0 && (
              <p>There are no registered projects!</p>
          )}
      </Container>
    </div>
  );
}
export default Projects;
