import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import Modal from "react-modal";
import "./App.css";
import ErrorMessager from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import RotatingLinesLoader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchGallery, per_page, Photo } from "./gallery-api";

Modal.setAppElement("#root");

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [totalPage, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [largeImageUrl, setLargeImageUrl] = useState<string | null>(null);
  const [altDescription, setAltDescription] = useState<string>("");

  const openModal = (imageUrl: string, description: string): void => {
    setLargeImageUrl(imageUrl);
    setAltDescription(description);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setLargeImageUrl(null);
  };

  const handleClick = (): void => setPage((prev) => prev + 1);

  const handleSearch = (search: string): void => {
    if (!search.trim()) {
      setSearchTerm("");
      setPage(1);
      setPhotos([]);
      setTotalItems(0);
      toast.error("Поле поиска не должно быть пустым");
      return;
    }
    setSearchTerm(search);
    setPage(1);
  };

  useEffect(() => {
    if (totalPage === page) {
      toast.success("Изображений больше нет");
    }
  }, [page, totalPage]);

  useEffect(() => {
    const fetchPhotos = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data, totalItems: fetchedTotalItems } = await fetchGallery(
          searchTerm,
          page
        );

        const extendedData: Photo[] = data.map((photo: Photo) => ({
          ...photo,
          likes: photo.likes || 0,
          user: photo.user || { name: "Unknown" },
        }));

        setPhotos((prevPhotos) =>
          page === 1 ? extendedData : [...prevPhotos, ...extendedData]
        );
        setTotalItems(fetchedTotalItems);
        setTotalPages(Math.ceil(fetchedTotalItems / per_page));
        setError(false);
      } catch (error: any) {
        setStatus(error.response ? error.response.status : null);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) fetchPhotos();
  }, [page, searchTerm]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessager status={status} error={error} />}
      {loading ? (
  <RotatingLinesLoader />
) : !error && photos.length > 0 ? (
  <ImageGallery
    photos={photos}
    openModal={(largeImageUrl: string, altDescription: string) =>
      openModal(largeImageUrl, altDescription)
    }
  />
) : (
  !error &&
  searchTerm &&
  photos.length === 0 && (
    <p className="messege">
      <span className="text">
        Извините, по вашему запросу ничего не найдено.
      </span>
      <BsFillEmojiFrownFill size={60} />
    </p>
  )
)}

      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        large={largeImageUrl}
        alt_description={altDescription}
      />
      {page < totalPage && <LoadMoreBtn onClick={handleClick} />}
    </>
  );
}

export default App;
