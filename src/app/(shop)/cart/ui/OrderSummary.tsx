"use client";

import { useCartStore } from "@/store";
import { currencyformat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInnformation());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if ( !loaded ) {
        return(<p>Loading...</p>)
    }

    return (
        <>
            {
                loaded && (

                    <div className="grid grid-cols-2">

                        <span>No. Productos</span>
                        <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

                        <span>Subtotal</span>
                        <span className="text-right">{currencyformat(subTotal)}</span>

                        <span>Impuesto (15%)</span>
                        <span className="text-right">{currencyformat(tax)}</span>

                        <span className="mt-5 text-2xl">Total</span>
                        <span className="mt-5 text-2xl text-right">{currencyformat(total)}</span>

                    </div>
                )
            }
        </>
    )
}
