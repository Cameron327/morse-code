import styles from "../styles/SoundButton.module.scss";

// Plays morse code sound.
export default function SoundButton() {
  return (
    <div className={styles.soundButtonContainer}>
      <div className={styles.playSoundButton}>
        <p className={styles.buttonText}>Play Sound</p>
      </div>
    </div>
  );
}
