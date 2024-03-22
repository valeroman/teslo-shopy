import { create } from 'zustand';
import type { CartProduct } from '@/interfaces';
import { persist } from 'zustand/middleware';




interface State {
    cart: CartProduct[];

    getTotalItems: () => number;

    addProductToCart: (product: CartProduct) => void;
    //updateProductQuantity
    //removeProduct
}

export const useCartStore = create<State>()(

    // El persit (middleware) se encarga de grabar en el localStorage y recuperar la data del localStorage
    persist(
        (set, get) => ({
            cart: [],

            //Methods

            getTotalItems: () => {

                const { cart } = get();

                // recorrer el arreglo de cart con el reduce
                // funcion que regresar () => ese valor (10), valor inicial (0)
                // () => 10, 0
                return cart.reduce(( total, item ) => total + item.quantity, 0);
            },

            addProductToCart: (product: CartProduct) => {
                // El get me permite obtener el estado actual
                const { cart } = get();

                // 1. Revisar si el producto existe en el carrito con la talla seleccionada
                // some => si existe algun elemento al menos uno, con la condicion que se va a especificar
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // Se que el producto existe por talla. Tengo que incrementar
                const updateCartProducts = cart.map((item) => {

                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                });

                set({ cart: updateCartProducts });

            }
        }),
        {
            name: 'shopping-cart'
        }

    )


)