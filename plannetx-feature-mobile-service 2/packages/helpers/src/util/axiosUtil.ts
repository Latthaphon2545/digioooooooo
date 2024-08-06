import { AxiosError } from 'axios';

const isAxiosError = (error: any): error is AxiosError =>{
  return error.isAxiosError !== undefined;
}

export const handleAxiosError = (error: unknown) => {
  if (isAxiosError(error)) {
      if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);

          return error.response.data
      } else if (error.request) {
          console.error('Request data:', error.request);
      } else {
          console.error('Error message:', error.message);
      }
  } else {
      console.error('An unknown error occurred', error);
  }
}