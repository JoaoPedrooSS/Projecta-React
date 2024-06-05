import styles from "./Home.module.css";
import savings from "../../img/savings.svg"
import LinkButton from "../Layout/LinkButton";
function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Welcome to <span>Projecta</span></h1>
      <p>Start managing your projects right now!</p>
      <LinkButton to="/NewProject" text="Create new Project"/>
      <img src={savings} alt="Projecta"/>
    </section>
  );
}
export default Home;
