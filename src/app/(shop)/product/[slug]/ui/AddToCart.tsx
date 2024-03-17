'use client';

import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components'
import { Product, Size } from '@/interfaces'


interface Props {
    product: Product;
}
//Client Component
export const AddToCart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        if (!size) return;

        console.log({ size, quantity });
    }

    return (
        <>
            {
                posted && !size && (
                    <span className='mt-2 text-red-500 fade-in'>
                        debe de seleccionar una talla*
                    </span>
                )
            }

            {/* Selector tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={(size) => setSize(size)}
            />

            {/* Selector cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={(quantity) => setQuantity(quantity)}
            />

            {/* Boton */}
            <button
                className="btn-primary my-5"
                onClick={addToCart}
            >
                Agregar al carrito
            </button>
        </>
    )
}
