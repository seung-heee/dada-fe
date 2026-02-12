import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const BASE_URL = 'https://api.dada-be.store';

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_INSTANCE(config).then((response) => response.data);
};
