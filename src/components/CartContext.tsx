import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import {Product} from '../products';
import localStorageService, {KEY} from '../services/localStorage';

export const CartContext = createContext({
    products: {},
    addProduct: (product: Product) => {
    },
    removeProduct: (product: Product) => {
    }
});

const CartState = ({children}: PropsWithChildren<{}>) => {
    const [cart, setCart] = useState<Record<string, Product>>({});
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        // try to load cart from localstorage
        const localCart = localStorageService.load(KEY);
        if (localCart) {
            setCart(localCart);
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        // wait for the first read before updating the storage
        if (loaded) {
            localStorageService.save(KEY, cart);
        }
    }, [cart, loaded]);

    const addProduct = (product: Product) => {
        const updatedCart = {
            ...cart,
            [product.name]: (cart[product.name] !== undefined ? {
                ...product,
                qty: cart[product.name].qty! + 1
            } : {...product, qty: 1})
        }
        setCart(updatedCart);
    }

    const removeProduct = (product: Product) => {
        const updatedCart = {...cart}

        if (updatedCart[product.name] === undefined) return

        if (updatedCart[product.name].qty === 1) {
            delete updatedCart[product.name];
        } else if (updatedCart[product.name].qty! > 1) {
            updatedCart[product.name].qty!--;
        }
        setCart(updatedCart);
    }

    return <CartContext.Provider
        value={{
            products: cart,
            addProduct,
            removeProduct
        }
        }
    >{children}</CartContext.Provider>
}

export default CartState;
