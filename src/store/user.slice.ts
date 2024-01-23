import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../interfaces/auth.interface";
import { Profile } from "../interfaces/user.interface";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string;
    profile?: Profile;
    registerErrorMessage?: string;
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}

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
                throw new Error(e.message)
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
                throw new Error(e.message)
            }
        }
    }
)

export const profile = createAsyncThunk<Profile, void, { state: RootState }>('user/profile',
    async (_, thunkApii) => {
        const jwt = thunkApii.getState().user.jwt;
        const { data } = await axios.get<Profile>(`/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return data;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //addJwt: (state, action: PayloadAction<string>) => {
        //    state.jwt = action.payload;
        //},
        logOut: (state) => {
            state.jwt = null;
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
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(profile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(registration.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(registration.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message;
        });
    }
});

export default userSlice.reducer;
export const userAction = userSlice.actions;