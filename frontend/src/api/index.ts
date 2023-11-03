import axios from 'axios';
import { getAllPosts } from './post/getAllPosts';

const api = axios.create({baseURL: "https://social-pet-backend.onrender.com"});

export default api;

export const apiRoutes = {
    getAllPosts: getAllPosts
}