import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul class={styles.list}>
        <li class={styles.item}>
          <FaFacebook />
        </li>
        <li class={styles.item}>
          <FaInstagram />
        </li>
        <li class={styles.item}>
          <FaLinkedin />
        </li>
      </ul>
      <p className={styles.copy}><span className={styles.span}>Projecta</span>&copy; 2021</p>
    </footer>
  );
}
export default Footer;
