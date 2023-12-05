import { Await, useLoaderData } from "react-router-dom";
import { ProductInt } from "../../interfaces/product.interface";
import { Suspense } from "react";

const Product = () => {
    const data = useLoaderData() as { data: ProductInt };
    return (
        <div>
            <Suspense fallback={<>Loading...</>}>
                <Await
                    resolve={data.data}
                >
                    {({ data }: { data: ProductInt }) => (
                        <>Product - {data.title}</>
                    )}
                </Await>
            </Suspense>
        </div>
    )
}

export default Product;