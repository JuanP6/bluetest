import axios from 'axios';

export const searchGifWithTerm = (
  searchTerm,
  offset
) => {
  const url = [
    `/search?q=${searchTerm}`,
    `api_key=ZU3IOzh3N3kZGICIholwxkB35dzSrkAB`,
    `limit=25`,
    `offset=${offset}`,
  ];

  return axios.get(url.join('&'));
};