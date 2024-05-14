import './checkout-item.styles.scss'
import { clearItemFromCart, addItemToCart, removeItemToCart } from '../../store/cart/cart.action'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'

const CheckoutItem = ({cartItem})=>{
    const {id, name, quantity, imageUrl, price} = cartItem
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,cartItem))
    const addItemHandler = () => dispatch(addItemToCart(cartItems,cartItem))
    const removeItemHandler = () => dispatch(removeItemToCart(cartItems,cartItem))


    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <span className='arrow' onClick={removeItemHandler}>&#10094;</span>
               <span className='value'>{quantity}</span> 
                <span className='arrow'onClick={addItemHandler}>&#10095;</span>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem