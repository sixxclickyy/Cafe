import { ProductInt } from "./product.interface";

export interface CartItemInterface {
    id: number;
    quantity: number;
    product: ProductInt;
}

