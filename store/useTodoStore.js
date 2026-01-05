import { create } from "zustand";
import {
  fetchTodosFromFirestore,
  addTodoToFirestore,
  deleteTodoFromFirestore,
  updateTodoInFirestore,
} from "../services/firestore";

export const useTodoStore = create((set, get) => ({
  // état global
  todos: [],
  loading: false,
  error: null,

  // Charger les todos depuis Firestore
  loadTodos: async (uid) => {
    if (!uid) return;
    set({ loading: true, error: null });
    try {
      const todos = await fetchTodosFromFirestore(uid);
      set({ todos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Ajouter un todo
  addTodo: async (uid, todo) => {
    if (!uid) return;
    set({ loading: true, error: null });
    try {
      await addTodoToFirestore(uid, todo);
      // Recharger les todos
      await get().loadTodos(uid);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Supprimer un todo
  removeTodo: async (uid, id) => {
    if (!uid) return;
    set({ loading: true, error: null });
    try {
      await deleteTodoFromFirestore(uid, id);
      // Recharger les todos
      await get().loadTodos(uid);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Mettre à jour un todo
  updateTodo: async (uid, id, updates) => {
    if (!uid) return;
    set({ loading: true, error: null });
    try {
      await updateTodoInFirestore(uid, id, updates);
      // Recharger les todos
      await get().loadTodos(uid);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setTodos: (todos) => set({ todos }),

  clearTodos: () => set({ todos: [] }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));
