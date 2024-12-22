import React from "react";

interface ImageCardProps {
  small: string;
  alt_description: string;
  large: string;
  openModal: (large: string, alt_description: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  small,
  alt_description,
  large,
  openModal,
}) => {
  return (
    <div onClick={() => openModal(large, alt_description)}>
      <img src={small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
