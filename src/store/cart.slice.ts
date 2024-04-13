import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = 'cart';

export interface CartItem {
    id: number;
    count: number;
    loginErrorMessage: string
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: []
}

export const addToCart = createAsyncThunk('cart/addToCart',
    async (params: { productId: number, quantity: number, userId: number }) => {
        try {
            const { data } = await axios.post(`/cart/add`, {
                productId: params.productId,
                quantity: params.quantity,
                userId: params.userId
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const deleteItem = createAsyncThunk('cart/deleteItem',
    async (params: { userId: number, productId: number }) => {
        try {
            const { data } = await axios.post(`/cart/add`, {
                userId: params.userId,
                productId: params.productId
            });
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
        // Добавим редукторы для увеличения и уменьшения количества товара
        increase: (state, action: PayloadAction<number>) => {
            const { payload: productId } = action;
            const existingItem = state.items.find(item => item.id === productId);
            if (existingItem) {
                existingItem.count++;
            }
        },
        decrease: (state, action: PayloadAction<number>) => {
            const { payload: productId } = action;
            const existingItem = state.items.find(item => item.id === productId);
            if (existingItem && existingItem.count > 1) {
                existingItem.count--;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            // Обновление состояния корзины после успешного добавления товара на сервере
        });
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            // Обновление состояния корзины после успешного удаления товара на сервере
        });
    }
});

export const cartActions = { ...cartSlice.actions, deleteItem, addToCart };
export default cartSlice.reducer;
