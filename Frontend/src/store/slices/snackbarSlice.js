import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: {
        isOpen: false,
        type: "error", // Default type
        message: "",
    },
    reducers: {
        close(state) {
            state.isOpen = false;
        },
        open(state, { payload }) {
            state.isOpen = true;
            state.type = payload?.type || "info"; // success or error or info
            state.message = payload?.message || ""; // Default to an empty string if message is not specified
        },
    },
});

// Actions
export const { open, close } = snackbarSlice.actions;

// Reducer
export default snackbarSlice.reducer;

