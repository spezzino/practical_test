import styled from 'styled-components';
import {Product, products} from '../products';
import ProductItem from './ProductItem';
import {useContext} from 'react';
import {CartContext} from './CartContext';

const Root = styled.div`
  flex: 0 0 70%;
  margin-right: 2rem;
`;

const ProductList = () => {
    const {addProduct} = useContext(CartContext);

    const handleAddToCart = (product: Product) => {
        addProduct(product);
    }

    return <Root>
        <h1>Products</h1>
        {products.map(product =>
            <ProductItem key={product.name} product={product} onAction={handleAddToCart} view="products"/>
        )}
    </Root>
}

export default ProductList;
