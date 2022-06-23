import styled from 'styled-components/macro';
import type {Product} from '../products';

const Root = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid gray;
  padding: 1rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.label`
  font-weight: bold;
  font-size: 1.3rem;
`;

const ProductPrice = styled.label`
  &:before {
    content: '$';
  }
`;

const AddToCart = styled.button``;

export interface IProductItem {
    product: Product;
    onAction: (product: Product) => void
    view: 'products' | 'cart'
}

const ProductItem = ({product, onAction, view}: IProductItem) => {
    const handleOnClick = (product: Product) => () => {
        onAction(product);
    }

    const isInCart = view === 'cart';

    return <Root>
        <ProductWrapper>
            <ProductName>{product.name}</ProductName>
            <p>{isInCart && `${product.qty} x `}<ProductPrice>{product.price.toFixed(2)}</ProductPrice>{isInCart &&
                ' = '}{isInCart && <ProductPrice>{(product.price * product.qty!).toFixed(2)}</ProductPrice>}</p>
        </ProductWrapper>
        <AddToCart onClick={handleOnClick(product)}>{isInCart ? 'Remove from' : 'Add to'} cart</AddToCart>
    </Root>
}

export default ProductItem;
