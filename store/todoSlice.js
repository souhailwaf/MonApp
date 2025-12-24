import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodos } from "../services/apiService";

// Async thunk to fetch todos from API
export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const todos = await fetchTodos();
      return todos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.items.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    setTodos: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTodo, removeTodo, updateTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
