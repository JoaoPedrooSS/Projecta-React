import styles from "./Project.module.css";
import { parse, v4 as uuidv4} from 'uuid';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Layout/Loading";
import Container from "../Layout/Container";
import ProjectForms from "../project/ProjectForms";
import Message from "../Layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project(){
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [showServiceForm, setShowServiceForm] = useState(false);

    useEffect(() => {
       setTimeout(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        }).then(resp => resp.json()).then((data) => {
            setProject(data)
            setServices(data.services)
        }).catch(err => console.log(err))
       }, 300)
    }, [id])
    function createService(project){
        setMessage('')
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        // maximum value validation
        if (newCost > parseFloat(project.budget)) {
          setMessage('the budget was exceeded! Check the value of the service')
          setType('error')
          project.services.pop()
          return false
        }
        //add service cost to project total cost
        project.cost = newCost;

        //update project

        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json()).then((data) => {
            setShowServiceForm(false)
        }).catch(err => console.log(err))
    }
    function removeService(id, cost){
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )
        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        }).then(resp => resp.json()).then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('service removed successfully')
        }).catch(err => console.log(err))
    }
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }
    function editPost(project){
        setMessage('')
        if(project.budget < project.cost){
            setMessage('The budget cannot be less than the cost of the project!')
            setType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json()).then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('The project has been updated!')
            setType('success')
        }).catch(err => console.log(err))
    }
    return(<>
    {project.name? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div className={styles.details_container}>
                    <h1>PROJECT: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Edit Project' : 'Close'}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Category: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total budget: </span>R${project.budget}
                                </p>
                                <p>
                                    <span>Total used: </span>R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                               <ProjectForms
                               handleSubmit={editPost}
                               btnText="Complete Edit"
                               projectData={project}/>
                            </div>
                        )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Add a service:  </h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Add a service' : 'Close'}</button>
                     <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm
                            handleSubmit={createService}
                            btnText="Add service"
                            projectData={project}/>
                        )}
                     </div>
                </div>
            </Container>
            <h2>Services</h2>
            <Container customClass="start"/>
            <div className={styles.services}>
            {(services.length > 0 ? (
                services.map((service) => (
                    <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}/>
                ))
            ) : (
                <p>There are no registered services</p>
            ))}
            </div>

        </div>
    ) : (
        <Loading/>
    )}</>)
}
export default Project