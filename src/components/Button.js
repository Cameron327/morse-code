import styles from "../styles/Button.module.scss";

// This button is an L lol since the library already came with a button.
// I can make this function generate the random text.
export default function Button(props) {
  return (
    <div className={styles.buttonContainer}>
      <div className={`${styles.button} ${props.speed === props.wpm ? styles.active : ""}`}>
        <p className={styles.buttonText}>{props.text}</p>
      </div>
    </div>
  );
}
