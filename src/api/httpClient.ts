import axios, { AxiosInstance } from 'axios';

export type TApiError = {
  type: 'backend';
  message: string;
  status?: number;
  code?: string;
};
const apiErrorHandler = (error: unknown): TApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.message,
      status: error.status,
      code: error.code,
      type: 'backend',
    };
  }
  return {
    message: 'not axios error',
    type: 'backend',
  };
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

class HttpClient {
  instance: AxiosInstance = axios.create({
    baseURL: API_URL,
  });

  async getRequest<T>(url: string): Promise<{data?: T; error?: TApiError}> {
    try {
      const response = await this.instance.get(`${url}&appid=${API_KEY}`);

      return {data: response.data};
    } catch (error) {
      return {error: apiErrorHandler(error)};
    }
  }
}

export const httpClient = new HttpClient();
