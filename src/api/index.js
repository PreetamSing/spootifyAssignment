import axios from 'axios';
import config from '../config';
import base64 from 'base-64';
import utf8 from 'utf8';

// API for fetching access token.
const authAPI = axios.create({ baseURL: "https://accounts.spotify.com/api" });

authAPI.interceptors.request.use((req) => {
    const bytes = utf8.encode(`${config.api.clientId}:${config.api.clientSecret}`);
    req.headers.Authorization = `Basic ${base64.encode(bytes)}`;
    return req;
});

const body = 'grant_type=client_credentials';

export const authorize = () => authAPI.post('/token', body)

// API for fetching data like songs, album, etc.

const dataAPI = axios.create({ baseURL: "https://api.spotify.com/v1/browse" });

dataAPI.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return req;
});

export const fetchNewReleases = (offset) => dataAPI.get(`/new-releases?country=IN&limit=20&offset=${offset}`);
export const fetchCategories = (offset) => dataAPI.get(`/categories?country=IN&limit=20&offset=${offset}`);
export const fetchFeaturedPlaylists = (offset) => dataAPI.get(`/featured-playlists?country=IN&limit=20&offset=${offset}`);