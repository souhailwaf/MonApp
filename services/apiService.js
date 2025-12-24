import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const CACHE_KEY = 'todos_cache';
const CACHE_TIMESTAMP_KEY = 'todos_cache_timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Fetch todos from API
export const fetchTodosFromAPI = async () => {
  try {
    const response = await apiClient.get('?_limit=20');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos from API:', error);
    throw error;
  }
};

// Get todos from cache
export const getTodosFromCache = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);
    const cachedTimestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (!cachedData || !cachedTimestamp) {
      return null;
    }

    const now = Date.now();
    const cacheTime = parseInt(cachedTimestamp);

    // Check if cache is still valid
    if (now - cacheTime < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }

    return null;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

// Save todos to cache
export const saveTodosToCache = async (todos) => {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(todos));
    await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Main function to fetch todos with caching
export const fetchTodos = async () => {
  try {
    // Try to get from cache first
    const cachedTodos = await getTodosFromCache();
    if (cachedTodos) {
      console.log('Returning cached todos');
      return cachedTodos;
    }

    // If cache is empty or expired, fetch from API
    console.log('Fetching todos from API');
    const todos = await fetchTodosFromAPI();

    // Save to cache
    await saveTodosToCache(todos);

    return todos;
  } catch (error) {
    // If API fails, try to return cached data even if expired
    const cachedTodos = await AsyncStorage.getItem(CACHE_KEY);
    if (cachedTodos) {
      console.log('API failed, returning expired cache');
      return JSON.parse(cachedTodos);
    }

    throw error;
  }
};

// Clear cache
export const clearTodosCache = async () => {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
    await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
