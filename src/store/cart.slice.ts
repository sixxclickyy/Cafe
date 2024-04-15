import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { USER_PERSISTENT_STATE } from "./user.slice";
import axios, { AxiosError } from "axios";

function getUserIdFromLocalStorage(): number | undefined {
    const userData = localStorage.getItem(USER_PERSISTENT_STATE);
    if (userData) {
        const { userId } = JSON.parse(userData);
        return userId;
    }
    return undefined;
}

export const userID = getUserIdFromLocalStorage()

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItem {
    id: number,
    count: number,
    userId: number | undefined
}

export interface CartState {
    items: CartItem[];
    count: number;
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: [],
    count: 0
}

export const getUserProducts = createAsyncThunk('user/cart',
    async (params: { email: string, password: string }) => {
        try {
            const { data } = await axios.get(`/auth/login`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(i => i.id === action.payload);
            if (!existed) {
                state.items.push({ id: action.payload, count: 1, userId: getUserIdFromLocalStorage() });
                return;
            }
            state.items.map(i => {
                if (i.id === action.payload) {
                    i.count++;
                }
                return i;
            })
        },
        remove: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(i => i.id === action.payload);
            if (existed) {
                if (!existed) {
                    return;
                }
                if (existed.count === 1) {
                    state.items = state.items.filter(i => i.id !== action.payload)
                } else {
                    state.items.map(i => {
                        if (i.id === action.payload) {
                            i.count--;
                        }
                        return i;
                    });
                    return;
                }
            }
        },
        delete: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload)
        }
    }
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;

