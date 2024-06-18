import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ProductInt } from '../interfaces/product.interface';

export const CATEGORY_PRODUCT_PERSISTENT_STATE = "category";

interface ProductState {
    products: ProductInt[];
    categoryProducts: ProductInt[];
    error?: string | null;
}

const initialState: ProductState = {
    products: [],
    categoryProducts: [],
    error: null,
};

export const getProducts = createAsyncThunk('product/get',
    async (params: { title?: string }) => {
        try {
            let url = '/products';
            if (params.title) {
                url = `/products/filter?title=${params.title}`;
            }
            const { data } = await axios.get<ProductInt[]>(url);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const getCategoryProducts = createAsyncThunk('product/category',
    async (params: { brand?: string }) => {
        try {
            const { data } = await axios.get(`/products/filterByCategory?category=${params.brand}`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const deleteProducts = createAsyncThunk('product/delete',
    async (productId: number) => {
        try {
            const { data } = await axios.delete(`/products/${productId}`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<ProductInt[]>) {
            state.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            if (action.payload) {
                state.products = action.payload;
            }
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            console.log(action.error);
            state.error = action.error.message;
        });
        builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
            if (action.payload) {
                state.categoryProducts = action.payload;
            }
        });

        builder.addCase(getCategoryProducts.rejected, (state, action) => {
            console.log(action.error);
            state.error = action.error.message;
        });
    }
});

export default productSlice.reducer;
export const cartAction = productSlice.actions;


