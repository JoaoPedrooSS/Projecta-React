import { useEffect, useState } from "react";

import React from "react";
import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForms({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
}
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }
  function handleCategory(e) {
    setProject({ ...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    },
  })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Project name"
        name="name"
        placeholder="Enter project name"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Input
        type="number"
        text="Project budget"
        name="budget"
        placeholder="Enter project total budget"
        handleOnChange={handleChange}
        value={project.budget}
      />
      <Select
        name="category_id"
        text="Select category"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : " "}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForms;
