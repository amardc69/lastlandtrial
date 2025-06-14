import axios from 'axios';
import { PGUser } from '../_components/interface';

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

// Function to fetch user by username
export const getUserByUsername = async (username: string): Promise<PGUser> => {
  const response = await axiosInstance.get(`/pgusers/username/${username}`);
  return response.data;
};
