import { Outlet } from "react-router-dom"
import '../../categories.styles.scss'
import Directory from '../../components/directory/directory.component'
const Home = () => {




  return (
    <>
    <Outlet />
    <Directory/>
    </>
    
)
}

export default Home
