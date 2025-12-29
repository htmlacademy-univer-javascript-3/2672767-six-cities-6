import axios, {AxiosError, AxiosInstance} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {BASE_URL, REQUEST_TIMEOUT} from '../const/api.ts';
import {dropToken, getToken} from '../services/token.ts';

const AUTH_HEADER = 'X-Token';

export const createApiClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers[AUTH_HEADER] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        dropToken();
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export const apiClient = createApiClient();
