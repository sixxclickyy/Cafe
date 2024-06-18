import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";
import productSlice, { CATEGORY_PRODUCT_PERSISTENT_STATE } from "./product.slice";
import promoSlice from "./promo.slice";
import orderSlice from "./orders.slice";

export const store = configureStore(
    {
        reducer: {
            user: userSlice,
            cart: cartSlice,
            product: productSlice,
            promo: promoSlice,
            order: orderSlice
        }
    }
);

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
    saveState(store.getState().cart, CART_PERSISTENT_STATE);
    saveState(store.getState().product.categoryProducts, CATEGORY_PRODUCT_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;