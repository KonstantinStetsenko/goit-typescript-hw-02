// ImageModal.tsx
import Modal from "react-modal";
import css from "./ImageModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
};

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  large: string | null;
  alt_description: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  large,
  alt_description,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.Modal}
      style={customStyles}
      aria-labelledby={contentLabel}
    >
      {large && (
        <img
          src={large}
          alt={alt_description}
          className={css.image}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <div className={css.containerButtDesc}>
        <button onClick={onRequestClose} className={css.closeButton}>
          Close
        </button>
        <h3 className={css.titleDesc}>{alt_description}</h3>
      </div>
    </Modal>
  );
};

export default ImageModal;
