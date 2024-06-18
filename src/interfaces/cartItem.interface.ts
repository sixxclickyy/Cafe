import { ProductInt } from "./product.interface";

export interface CartItemInterface {
    productid: number;
    quantity: number;
    product: ProductInt;
}

