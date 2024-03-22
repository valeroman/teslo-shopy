'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";

export const ProductsInCart = () => {

    const productInCart = useCartStore(state => state.cart);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                (loaded && productInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5" >
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            alt={product.title}
                            className="mr-5 rounded"
                        />

                        <div>
                            <Link
                                className="hover:underline cursor-pointer" 
                                href={`/product/${ product.slug }`}
                            >
                               { product.size } - {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                quantity={3}
                                onQuantityChanged={value => console.log(value)}
                            />
                        </div>

                    </div>
                )))
            }
        </>
    )
}
