import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "todos_store";

export const useTodoStore = create((set) => ({
  // état global
  todos: [],
  loading: false,
  error: null,

  // actions
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    })),

  setTodos: (todos) => set({ todos }),

  clearTodos: () => set({ todos: [] }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Persist todos to AsyncStorage
  persistTodos: async (todos) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Error persisting todos:", error);
    }
  },

  // Load todos from AsyncStorage
  loadTodos: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        set({ todos: JSON.parse(data) });
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    }
    return [];
  },
}));
