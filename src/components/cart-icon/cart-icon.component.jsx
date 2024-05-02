import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen,cartCount } = useContext(CartContext)
    //console.log( cartCount)
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon