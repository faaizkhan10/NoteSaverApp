import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// API base URL - use environment variable for production
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Async thunks for API calls
export const fetchPastes = createAsyncThunk(
  "paste/fetchPastes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_URL}/pastes`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch pastes");
      }

      const data = await response.json();
      return data.pastes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPaste = createAsyncThunk(
  "paste/createPaste",
  async (pasteData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_URL}/pastes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pasteData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create paste");
      }

      const data = await response.json();
      return data.paste;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePaste = createAsyncThunk(
  "paste/updatePaste",
  async ({ id, pasteData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_URL}/pastes/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pasteData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update paste");
      }

      const data = await response.json();
      return data.paste;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePaste = createAsyncThunk(
  "paste/deletePaste",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_URL}/pastes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete paste");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  pastes: [],
  loading: false,
  error: null,
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPastes: (state) => {
      state.pastes = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch pastes
      .addCase(fetchPastes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.loading = false;
        state.pastes = action.payload;
        toast.success("Pastes loaded successfully!");
      })
      .addCase(fetchPastes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to load pastes");
      })
      // Create paste
      .addCase(createPaste.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaste.fulfilled, (state, action) => {
        state.loading = false;
        state.pastes.unshift(action.payload);
        toast.success("Paste created successfully!");
      })
      .addCase(createPaste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to create paste");
      })
      // Update paste
      .addCase(updatePaste.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaste.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pastes.findIndex(
          (paste) => paste._id === action.payload._id
        );
        if (index !== -1) {
          state.pastes[index] = action.payload;
        }
        toast.success("Paste updated successfully!");
      })
      .addCase(updatePaste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to update paste");
      })
      // Delete paste
      .addCase(deletePaste.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaste.fulfilled, (state, action) => {
        state.loading = false;
        state.pastes = state.pastes.filter(
          (paste) => paste._id !== action.payload
        );
        toast.success("Paste deleted successfully!");
      })
      .addCase(deletePaste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to delete paste");
      });
  },
});

export const { clearError, resetPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
