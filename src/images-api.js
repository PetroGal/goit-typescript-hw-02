import axios from 'axios';

const ClientID = 'dBuMvLXh6L1B4K52l-9lfn7uvRhmfjXwF6KfwnBM1X8';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${ClientID}`;

export const getPhotos = async (query, page) => {
  const { data } = await axios.get('search/photos', {
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
