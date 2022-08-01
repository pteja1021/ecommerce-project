import {NavLink} from 'react-router-dom'
import './navbar-styling.css'
import {useRecoilState} from 'recoil'
function Navbar(props){
    const [currentCart,setCart]=useRecoilState(props.atom)
    return (
        <div className='nav-container'>
            <div className='navbar-container'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products/:id'>Product</NavLink>
            </div>
            <div>
                <button className='cart-button'>{`Cart(${ Object.keys(currentCart).length})`}</button>
            </div>
        </div>
    )
}
export default Navbar;