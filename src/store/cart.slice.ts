import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { USER_PERSISTENT_STATE } from "./user.slice";
import axios, { AxiosError } from "axios";
import { logOut } from "./user.slice";

function getUserIdFromLocalStorage(): number | undefined {
    const userData = localStorage.getItem(USER_PERSISTENT_STATE);
    if (userData) {
        const { userId } = JSON.parse(userData);
        return userId;
    }
    return undefined;
}

function getUserEmailFromLocalStorage(): number | undefined {
    const userData = localStorage.getItem(USER_PERSISTENT_STATE);
    if (userData) {
        const { email } = JSON.parse(userData);
        return email;
    }
    return undefined;
}

export interface OrderItem {
    productId: number;
    quantity: number;
    number: string;
    price: number;
}

export const userID = getUserIdFromLocalStorage()

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItem {
    id: number,
    count: number,
    userId: number | undefined,
    productId: number | undefined,
}

export interface CartState {
    items: CartItem[];
    count: number;
    addProductErrorMessage?: string;
    orderMessage?: string;
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: [],
    count: 0
}

export const getUserProducts = createAsyncThunk('user/cart',
    async () => {
        try {
            const { data } = await axios.get(`/cart/${userID}`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const addProduct = createAsyncThunk('cart/add',
    async (params: { productId: number }) => {
        try {
            const { data } = await axios.post(`/cart/add`, {
                productId: params.productId,
                quantity: 1,
                userId: getUserIdFromLocalStorage()
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const deleteProduct = createAsyncThunk('cart/delete',
    async (params: { productId: number }) => {
        try {
            const { data } = await axios.post(`/cart/delete`, {
                userId: getUserIdFromLocalStorage(),
                productId: params.productId,
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const decreaseProduct = createAsyncThunk('cart/decrease',
    async (params: { productId: number }) => {
        try {
            const { data } = await axios.post(`/cart/decrease`, {
                userId: getUserIdFromLocalStorage(),
                productId: params.productId,
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const increaseProduct = createAsyncThunk('cart/increase',
    async (params: { productId: number }) => {
        try {
            const { data } = await axios.post(`/cart/increase`, {
                userId: getUserIdFromLocalStorage(),
                productId: params.productId,
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const order = createAsyncThunk('/orders',
    async (params: OrderItem) => {
        try {
            const { data } = await axios.post(`/orders`, {
                userEmail: getUserEmailFromLocalStorage(),
                number: params.number,
                productId: params.productId,
                quantity: params.quantity,
                price: params.price,
                userId: getUserIdFromLocalStorage()
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
    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.fulfilled, (state, action) => {
            if (action.payload) {
                state.count = action.payload.totalQuantity
            }
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            console.log(action.error);
            state.addProductErrorMessage = action.error.message;
        });
        builder.addCase(getUserProducts.fulfilled, (state, action) => {
            state.count = action.payload.totalItemsCount;
        });
        builder.addCase(getUserProducts.rejected, (state, action) => {
            console.log(action.error);
            state.addProductErrorMessage = action.error.message;
        });
        builder.addCase(logOut, (state) => {
            state.count = 0;
        });
        builder.addCase(order.fulfilled, (state, action) => {
            state.orderMessage = action.payload.message;
            state.count = 0;
        });
        builder.addCase(order.rejected, (state, action) => {
            console.log(action.error);
            state.orderMessage = action.error.message;
        });
    }
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;

