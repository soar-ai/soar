import {
  storage,
} from '@/utils/storage';
import axios from 'axios';
import {
  AuthApi,
  UsersApi,
} from './generated';

const instance = axios.create();

const getAccessToken = () => {
  const session = storage.getString('auth');
  if (session) {
    return JSON.parse(session).accessToken as string;
  }
};

// This handles adding auth to the request
instance.interceptors.request.use(
  (config) =>
    new Promise((resolve) => {
      const accessToken = getAccessToken();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      resolve(config);
    }),
);

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const usersApi = new UsersApi(undefined, BASE_URL, instance);

export const authApi = new AuthApi(undefined, BASE_URL, instance);
