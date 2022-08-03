import {atom,useRecoilState} from 'recoil'
const currentCartState=atom({ 
    key:'cart',
    default:{}
})
const useCart=()=>{
    const [cart,setCart]=useRecoilState(currentCartState)
    return [cart,setCart]
}
export {useCart,currentCartState};