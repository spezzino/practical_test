import styled from 'styled-components';
import {CartContext} from './CartContext';
import {useContext, useEffect, useState} from 'react';
import {Product} from '../products';
import ProductItem from './ProductItem';

const Root = styled.div`
  flex: 1 0 30%;
`;

const CartList = () => {
    const {products: productsInCart} = useContext(CartContext);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);

    useEffect(() => {
        console.log(productsInCart);
        let tp = 0, tv = 0;
        Object.values(productsInCart).forEach(value => {
            const product = value as Product;
            tp += product.qty!;
            tv += product.qty! * product.price;
        });
        setTotalValue(tv);
        setTotalProducts(tp);
    }, [productsInCart]);

    const {removeProduct} = useContext(CartContext);

    const handleRemoveFromCart = (product: Product) => {
        removeProduct(product);
    }

    return <Root>
        <h1>Cart</h1>
        {Object.values(productsInCart).map(value => {
            const product = value as Product;
            return <ProductItem key={product.name} product={product} onAction={handleRemoveFromCart}
                                view="cart"/>
        })}
        <hr/>
        Total Products: {totalProducts}<br/>
        Total Value: {totalValue.toFixed(2)}<br/>
    </Root>
}

export default CartList;
