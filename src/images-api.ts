import axios from 'axios';
import { Image } from './types';

const ClientID = 'dBuMvLXh6L1B4K52l-9lfn7uvRhmfjXwF6KfwnBM1X8';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${ClientID}`;

interface GetPhotosResponse {
  results: Image[];
  total: number;
}

export const getPhotos = async (
  query: string,
  page: number
): Promise<GetPhotosResponse> => {
  const { data } = await axios.get<GetPhotosResponse>('search/photos', {
    params: {
      client_id: ClientID,
      query: query,
      orientation: 'landscape',
      page: page,
      per_page: 12,
    },
  });

  return data;
};
