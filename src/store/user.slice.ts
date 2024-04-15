import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../interfaces/auth.interface";
import { Profile } from "../interfaces/user.interface";

export const JWT_PERSISTENT_STATE = 'token';
export const USER_PERSISTENT_STATE = 'user';

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string;
    profile?: Profile;
    registerErrorMessage?: string;
    email: string;
    name: string;
    userId: number | undefined;
}

const initialState: UserState = {
    jwt: localStorage.getItem(JWT_PERSISTENT_STATE),
    email: "",
    name: "",
    userId: undefined
}

const savedUserData = localStorage.getItem(USER_PERSISTENT_STATE);
if (savedUserData) {
    const { email, name } = JSON.parse(savedUserData);
    initialState.email = email;
    initialState.name = name;
}

axios.defaults.baseURL = 'http://localhost:3001/api';

export const login = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`/auth/login`, {
                email: params.email,
                password: params.password
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const registration = createAsyncThunk('user/registration',
    async (params: { email: string, password: string, name: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`/auth/registration`, {
                email: params.email,
                password: params.password,
                name: params.name
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const logout = createAsyncThunk('user/logout',
    async () => {
        try {
            await axios.post(`/auth/logout`);
            localStorage.removeItem(JWT_PERSISTENT_STATE);
            localStorage.removeItem(USER_PERSISTENT_STATE);
            return null;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const profile = createAsyncThunk<Profile, void, { state: RootState }>(
    'user/profile',
    async (_, thunkApi) => {
        const jwt = thunkApi.getState().user.jwt;
        try {
            const { data } = await axios.get<Profile>(`/user/profile`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.profile = action.payload;
        },
        logOut: (state) => {
            state.jwt = null;
            state.email = "";
            state.name = "";
            state.userId = undefined
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.jwt = action.payload.access_token;
                state.email = action.payload.user.email;
                state.name = action.payload.user.name;
                state.userId = action.payload.user.id

                localStorage.setItem(USER_PERSISTENT_STATE, JSON.stringify({
                    userId: action.payload.user.id,
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                }));
            }
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log(action.error);
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(profile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(registration.fulfilled, (state, action) => {
            if (action.payload) {
                state.jwt = action.payload.access_token;
            }
        });
        builder.addCase(registration.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message;
        });
    }
});

export const { setUser, logOut, clearLoginError, clearRegisterError } = userSlice.actions;

export default userSlice.reducer;
