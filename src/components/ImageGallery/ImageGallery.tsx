import { Photo } from "../../gallery-api";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";



interface ImageGalleryProps {
  photos: Photo[];
  openModal: (largeImageUrl: string, altDescription: string) => void;
}

export let ArrPhoto: Photo[] = [];

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, openModal }) => {
  return (
    <ul className={css.containerGallery}>
      {photos.map((photo) => (
        <li
          className={css.listGallery}
          key={photo.id}
          onClick={() => openModal(photo.urls.regular, photo.alt_description)}
        >
          <ImageCard
            small={photo.urls.small}
            alt_description={photo.alt_description}
            large={photo.urls.regular}
            openModal={openModal}
          />
          <div className={css.text}>
            <p className={css.textName}>likes: </p> {photo.likes}
          </div>
          <div className={css.text}>
            <p className={css.textName}>Author: </p> {photo.user.name}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
