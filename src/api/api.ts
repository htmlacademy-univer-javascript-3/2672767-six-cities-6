import axios, {AxiosInstance} from 'axios';
import {BASE_URL, REQUEST_TIMEOUT} from '../const/api.ts';

export const createApiClient = (): AxiosInstance =>
  axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

export const apiClient = createApiClient();
