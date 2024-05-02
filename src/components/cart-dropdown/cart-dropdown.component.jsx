import { CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navitate = useNavigate();

    const goToCheckoutHandler = () => {
        navitate('/checkout')
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?(
                        cartItems.map(item=>{
                            return(     <CartItem key={item.id} cartItem={item}  /> )
                        })
                    ):(<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;