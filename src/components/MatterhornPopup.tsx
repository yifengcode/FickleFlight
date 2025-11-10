import { FunctionComponent } from "react";
import styles from "./MatterhornPopup.module.css";

export type MatterhornPopupType = {
  className?: string;
  onClose?: () => void;
};

const MatterhornPopup: FunctionComponent<MatterhornPopupType> = ({
  className = "",
  onClose,
}) => {
  return (
    <div className={[styles.matterhornPopup, className].join(" ")}>
      <iframe
        className={styles.video}
        src="https://www.youtube.com/embed/DKDz_3bHBWY?autoplay=0&mute=0"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default MatterhornPopup;
