import { useContext } from "react"
import {  Outlet, Link } from "react-router-dom"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import Crown  from '../../assets/crown.svg'
import {NavitationContainder, NavLink, NavLinksContainer, LogoContainer } from  './navigation.styles.jsx'
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"



const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext);
    const signOutHandler = async () => {
     await  signOutUser();
    }
    return(
      <>
        <NavitationContainder>
            <LogoContainer  to="/">
                <Crown className="logo" />
            </LogoContainer>

            <NavLinksContainer className="nav-links-container">
                <NavLink  to='/shop'>
                    SHOP
                </NavLink>{
                  currentUser ? (
                    <NavLink as='span' onClick={signOutHandler}>SIGN OUT </NavLink>
                  ):(
                  <NavLink  to='/auth'>
                    SIGN IN
                  </NavLink>
                  )
                }
                <CartIcon />                
            </NavLinksContainer>
            {isCartOpen && <CartDropdown />}
        </NavitationContainder>
        <Outlet />
      </>
    )
  }

 export default Navigation
  