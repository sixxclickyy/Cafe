export interface OrderInterface {
    id: number,
    image: string,
    useremail: string,
    number: string,
    productid: number,
    date: string,
    quantity: number,
    price: number,
    isaccepted: boolean | string
}