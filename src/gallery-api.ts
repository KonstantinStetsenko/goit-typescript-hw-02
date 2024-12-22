import axios from "axios";

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


interface FetchGalleryResponse {
  data: Photo[]; 
  totalItems: number; 
  itemsPerPage: number; 
  
}

export const search = "dog";
export const page = 1;
export const per_page = 20;



export async function fetchGallery(search: string,
  page: number):Promise<FetchGalleryResponse> {
  const response = await axios({
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
}

export default fetchGallery;
