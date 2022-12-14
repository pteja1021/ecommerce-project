import { getSingleProduct } from "../apis/ProductApis";
import {useQuery} from '@tanstack/react-query';
import './itemInCart.css'
function ItemInCart({id,quantity}){
    const {data,status,isFetching}=useQuery([`cart-item-${id}`,id], getSingleProduct);
    if (status==='error' || status==='loading' || isFetching){
        return <p>Loading</p>
    }
    return (
            <div className='single-item-container'>
                <div className="cart-item-image">
                    <img src={data.image} alt='cart-item'/>
                </div>
                <div className="cart-item-description">
                    <p className="cart-item-description-name"><strong>{data.name}</strong></p>
                    <p>{data.description}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Price: <strong>$ {quantity*data.price}</strong></p>
                </div>
            </div>
        )
}
export default ItemInCart;