import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, login_check, googleLoginApi } from "../../api/authApi";

const getInitialState = () => {
    let token = localStorage.getItem("jwtToken") ?? null;
    return {
        isAuthenticated: false,
        token,
        user: null,
        loginloader: false,
        error: false
    };
};

export const normalLogin = createAsyncThunk(
    "auth/normalLogin",
    async (payload, thunkAPI) => {
        const response = await login(payload.email, payload.password, payload.alignment);
        return response;
    },
);
export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (payload, thunkAPI) => {
        console.log(payload.token);
        const response = await googleLoginApi(payload.token);
        return response;
    },
);
export const UpdateUserInfo = createAsyncThunk("auth/UpdateUserInfo", async (payload, thunkAPI) => {
    const response = await login_check();
    return response
})


const authSlice = createSlice({
    name: "Auth",
    initialState: getInitialState(),
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("jwtToken");
        },
        clearErrors(state) {
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(normalLogin.fulfilled, (state, { payload }) => {
            state.isAuthenticated = true;
            state.token = payload.token;
            state.user = payload.user;
            state.loginloader = false;
            localStorage.setItem("jwtToken", payload.token);
        });
        builder.addCase(normalLogin.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = true;
            state.loginloader = false;
            localStorage.removeItem("jwtToken");
        });
        builder.addCase(UpdateUserInfo.fulfilled, (state, { payload }) => { // Corrected spelling here
            state.isAuthenticated = true;
            state.user = payload.user;
        });
        builder.addCase(UpdateUserInfo.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('jwtToken');
        });
        builder.addCase(normalLogin.pending, (state,action) => {
            state.loginloader = true;
        });
        
        builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
            state.isAuthenticated = true;
            state.token = payload.token;
            state.user = payload.user;
            state.loginloader = false;
            localStorage.setItem("jwtToken", payload.token);
        });
        builder.addCase(googleLogin.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = true;
            state.loginloader = false;
            localStorage.removeItem("jwtToken");
        });
        builder.addCase(googleLogin.pending, (state,action) => {
            state.loginloader = true;
        });

    }
});

// Actions
export const { logout,clearErrors } = authSlice.actions;

// Reducer
export default authSlice.reducer;
