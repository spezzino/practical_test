import styled from 'styled-components';
import ProductList from './components/ProductList';
import CartList from './components/CartList';
import CartState from './components/CartContext';

const Root = styled.div`
  margin: 20px 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export default function App() {
    return (
        <CartState>
            <Root>
                <ProductList/>
                <CartList/>
            </Root>
        </CartState>
    );
}
