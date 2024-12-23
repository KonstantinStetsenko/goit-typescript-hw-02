import axios, { AxiosResponse } from "axios";

const API_KEY = "raLFzrHm_qCJkpZwZMAVi26Er4KW4PemxmIVKtzBpLY";
const BASE_URL = "https://api.unsplash.com";
const ENDPOINT = "/search/photos/";

export interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  likes: number;
  user: {
    name: string;
  };
}

interface UnsplashApiResponse {
  results: Photo[];
  total: number;
}

export const per_page = 20;

export async function fetchGallery(
  search: string,
  page: number
): Promise<{ data: Photo[]; totalItems: number; itemsPerPage: number }> {
  try {
    const response: AxiosResponse<UnsplashApiResponse> = await axios({
      baseURL: BASE_URL,
      url: ENDPOINT,
      params: {
        client_id: API_KEY,
        page: page,
        per_page: per_page,
        query: search,
        orientation: "landscape",
      },
    });

    const totalItems = response.data.total; 
    const itemsPerPage = response.data.results.length; 

    return {
      data: response.data.results, 
      totalItems: totalItems, 
      itemsPerPage: itemsPerPage, 
    };
  } catch (error) {
    console.error("Ошибка при запросе к Unsplash API:", error);
    throw new Error("Не удалось загрузить данные из Unsplash API");
  }
}

export default fetchGallery;
