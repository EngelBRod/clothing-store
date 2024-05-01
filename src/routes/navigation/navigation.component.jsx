import { useContext } from "react"
import {  Outlet, Link } from "react-router-dom"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import Crown  from '../../assets/crown.svg'
import './navigation.styles.scss'
import { UserContext } from "../../context/user.context"
import { CartContext } from "../../context/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"



const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext);
    //console.log(currentUser)
    const signOutHandler = async () => {
     await  signOutUser();
    }
    return(
      <div>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <Crown className="logo" />
            </Link>

            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>{
                  currentUser ? (
                    <span className="nav-link" onClick={signOutHandler}>SIGN OUT </span>
                  ):(
                  <Link className="nav-link" to='/auth'>
                    SIGN IN
                  </Link>
                  )
                }
                <CartIcon />                
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </div>
    )
  }

 export default Navigation
  