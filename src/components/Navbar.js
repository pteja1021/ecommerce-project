import {NavLink} from 'react-router-dom'
import './navbar-styling.css'
import {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import ItemInCart from './ItemInCart'
import {cartAtom} from '../atoms/cartAtom'

function Navbar(){

    //eslint-disable-next-line
    const [currentCart,setCart]=useRecoilState(cartAtom)

    const [borderStyle,setBorderStyle]=useState('none')
    useEffect(()=>{
        if (Object.keys(currentCart).length!==0)
            setBorderStyle('2px solid black')
        else
            setBorderStyle('none')
    },[currentCart])
    

    const [visibility,setVisibility]=useState('none')
    function changeVisibility(){
        if (visibility==='block')
            setVisibility('none')
        else
            setVisibility('block')
    }

    return (
        <div className='nav-container'>
            <div className='navbar-container'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products/:id'>Product</NavLink>
            </div>
            <div className='parent-cart-div'>
                <button className='cart-button' onClick={changeVisibility}>{`Cart(${ Object.keys(currentCart).length})`}</button>
                <div className='all-cart-items' style={{display:[visibility]}}>
                    <div className="all-items-container" style={{border:[borderStyle]}}>
                        {Object.keys(currentCart).map((id)=><ItemInCart key={id} id={id} quantity={currentCart[`${id}`]} /> )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;