import './product-page-styling.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useRecoilState} from 'recoil';
import {cartAtom} from '../atoms/cartAtom'

function Product(){

    const [currentCart,setCart]=useRecoilState(cartAtom);
    const params=useParams();
    let productId=params['id'];
    if (params['id']===':id')
        productId=1;
    const {data,status,isFetching}=useQuery([`showProduct-${productId}`], async () => {const { data } = await axios.get(`https://obscure-refuge-62167.herokuapp.com/products/${productId}`);
                                                                    return data;}
                                            );

    const [currentImage,setCurrentImage]=useState('')
    useEffect(()=>{
        if (data){
            setCurrentImage(data?.image)
        }
    },[data])

    const [currentQuantity,setQuantity]=useState(0)
    useEffect(()=>{
        if (data){
            setQuantity(data?.quantity-(currentCart[data['id']]? currentCart[data['id']]:0))
        }
    },[data,currentCart])

    if (status==='error')
        return <h1>Server Down</h1>
    if (status==='loading' || isFetching)
        return <h1>Loading...</h1>
    
    function addToCart(){
        setCart({...currentCart,[data.id]:1})
        setQuantity(currentQuantity-1);
    }
    
    function getQuantityText(){
        if (currentQuantity>10)
            return 'Available'
        else if (currentQuantity===0)
            return 'Unavailable'
        else if (currentQuantity<=10)
            return 'Selling Fast ⚡⚡⚡'
        else    
            return 'not enough data';
    }
    
    function triggerChangeInQuantity(sign){
        if (sign==='+'){
            setCart({...currentCart,[data.id]:currentCart[data.id]+1})
            setQuantity(currentQuantity-1);
        }
        else { 
            if (currentCart[data['id']]===1){
                let a={...currentCart}
                delete a[data.id]
                setCart(a);
                setQuantity(data['quantity']);
            }
            else{
                setCart({...currentCart,[data.id]:currentCart[data.id]-1})
                setQuantity(currentQuantity+1);
            }
            
        }
    }
    
    return (
        <div className='product-page-container'>
            <div className='product-page-image'>
                <img className='card-image' style={{width:'100%',height:'100%'}} src={currentImage} alt="bottles"/>
            </div>
            <div className='product-page-product-description'>
                <h2>{data['name']}</h2>
                <p>{data['description']}</p>
                <p className='product-page-price'>Price : <span>{`$ ${data['price']}`}</span></p>
                <p>Left Over: {currentQuantity}</p>
                <p>{getQuantityText()}</p>
                {data?.variants.map((variant,index)=>{
                    return <button className='variant-buttons' key={variant.color} style={{backgroundColor: variant.color}} onClick={()=>{ setCurrentImage(variant?.image) }}></button>
                })}
                <br/>

                {(data['id'] in currentCart)?
                    (<div className='counter'>                
                        <button className='quantity-buttons' disabled={currentQuantity===0?true:false} onClick={ () =>  triggerChangeInQuantity('+')  }>+</button>
                        <p>{currentCart[data['id']]}</p>
                        <button className='quantity-buttons' disabled={currentQuantity===data['quantity']?true:false} onClick={ () =>  triggerChangeInQuantity('-')  }>-</button>
                    </div>):
                    <button className='add-to-cart-button' onClick={addToCart}>Add to Cart</button>
                }
            </div>
        </div>
    )

}
export default Product;