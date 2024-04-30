import {  Outlet, Link } from "react-router-dom"
import crown  from '../../assets/crown.svg'
import './navigation.styles.scss'


const Navigation = () => {
    return(
      <div>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <crown className="logo"> Logo </crown>
            </Link>

            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
            </div>
        </div>
        <Outlet />
      </div>
    )
  }

 export default Navigation
  