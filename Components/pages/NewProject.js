import { useNavigate } from "react-router-dom";
import ProjectForms from "../project/ProjectForms";
import styles from "./NewProject.module.css";
import { useState } from "react";

function NewProject() {
  const navigate = useNavigate();
  const createPost = (project) => {
    //initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch(`http://localhost:5000/projects`, {
      method: "POST", // Corrigi para POST, presumindo que você esteja criando um novo projeto
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log(data);
        const state = {message: "Project created successfully!"}
        navigate ("/Projects", {state})
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.newproject_container}>
      <h1>Create Project</h1>
      <p>Create your project before adding services</p>
      <p>form</p>
      <ProjectForms handleSubmit={createPost} btnText="Create Project" />
    </div>
  );
}

export default NewProject;
