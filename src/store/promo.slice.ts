import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface PromoCode {
    id: number;
    code: string;
    discount: number;
    is_active: false;
}

interface PromoState {
    promo: PromoCode | null;
    error: string | null;
}

const initialState: PromoState = {
    promo: null,
    error: null
};

export const fetchPromo = createAsyncThunk('promo/fetchPromo',
    async (code: string) => {
        try {
            const { data } = await axios.get(`promocodes/${code}`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message)
            }
        }
    }
)

const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromo.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchPromo.fulfilled, (state, action: PayloadAction<PromoCode>) => {
                if (action.payload.is_active) {
                    state.promo = action.payload;
                } else {
                    state.promo = null;
                }
            })
            .addCase(fetchPromo.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default promoSlice.reducer;
