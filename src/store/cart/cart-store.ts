import { create } from 'zustand';
import type { CartProduct } from '@/interfaces';
import { persist } from 'zustand/middleware';




interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSummaryInnformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
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

            getSummaryInnformation: () => {

                const { cart } = get();

                const subTotal = cart.reduce( (subTotal, product) => (product.quantity * product.price) + subTotal, 0 );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce(( total, item ) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, itemsInCart
                }


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

            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {

                const { cart } = get();

                const updatedCartProduct = cart.map((item) => {
                    if ( item.id === product.id && item.size === product.size ) {
                        return { ...item, quantity: quantity}
                    }
                    return item;
                });

                set({ cart: updatedCartProduct });
            },

            removeProduct: (product: CartProduct ) => {

                const { cart } = get();

                const removeCartProduct = cart.filter((item) => {
                    if ( item.id !== product.id || item.size !== product.size ) {
                        return { ...item }
                    }
                });

                set({ cart: removeCartProduct });
            }
        }),
        {
            name: 'shopping-cart'
        }

    )


)