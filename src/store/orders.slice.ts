import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { OrderInterface } from "../interfaces/order.interface";
import { USER_PERSISTENT_STATE } from "./user.slice";

function getUserIdFromLocalStorage(): number | undefined {
    const userData = localStorage.getItem(USER_PERSISTENT_STATE);
    if (userData) {
        const { userId } = JSON.parse(userData);
        return userId;
    }
    return undefined;
}

function getUserEmailFromLocalStorage(): string | undefined {
    const userData = localStorage.getItem(USER_PERSISTENT_STATE);
    if (userData) {
        const { email } = JSON.parse(userData);
        return email;
    }
    return undefined;
}

export interface OrderState {
    orders: OrderInterface[];
    loading: boolean;
    error: string | null;
    orderMessage?: string;
    isAccepted: boolean;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    isAccepted: false,
};

export const order = createAsyncThunk('/orders',
    async (params: OrderInterface) => {
        try {
            const { data } = await axios.post(`/orders`, {
                userEmail: getUserEmailFromLocalStorage(),
                number: params.number,
                productId: params.productid,
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

export const getOrder = createAsyncThunk('/getOrders',
    async () => {
        try {
            const userId = getUserIdFromLocalStorage();
            const { data } = await axios.get(`/orders/${userId}`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const getAllOrders = createAsyncThunk('/getAllOrders',
    async () => {
        try {
            const { data } = await axios.get(`/orders`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const updateOrderAcceptance = createAsyncThunk(
    '/update/order',
    async (params: { orderId: number; isAccepted: string }) => {
        try {
            console.log(params)
            const { data } = await axios.put(`/orders/${params.orderId}/accept/${params.isAccepted}`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch orders';
        });
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });

        builder.addCase(updateOrderAcceptance.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateOrderAcceptance.fulfilled, (state, action) => {
            state.loading = false;
            const updatedOrder = action.payload;
            state.orders = state.orders.map(order =>
                order.id === updatedOrder.id ? updatedOrder : order
            );
            state.isAccepted = updatedOrder.isaccepted === '1';
        });
        builder.addCase(updateOrderAcceptance.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update order';
        });
    },
});

export default orderSlice.reducer;
export const orderActions = orderSlice.actions;
