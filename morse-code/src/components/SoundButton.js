import styles from "../styles/SoundButton.module.scss";

// This button is an L lol since the library already came with a button.
// I can make this function generate the random text.
export default function SoundButton() {
  return (
    <div className={styles.soundButtonContainer}>
      <div className={styles.playSoundButton}>
        <p className={styles.buttonText}>Generate Random Text</p>
      </div>
    </div>
  );
}
