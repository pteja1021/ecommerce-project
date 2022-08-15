import './product-page-styling.css'
import { useQuery,useMutation} from '@tanstack/react-query'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useCart} from '../atoms/cartAtom'
import {getReviews} from '../apis/ProductApis'
import { getSingleProduct } from '../apis/ProductApis'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query'

function Product(){
    const queryClient = useQueryClient();
    const [currentCart,setCart]=useCart();
    const params=useParams();
    let productId=params['id'];
    if (params['id']===':id')
        productId=1;
    
    const {data,status,isFetching}=useQuery([`showProduct-${productId}`,productId], getSingleProduct);
    
    const {data:reviewData}=useQuery(['product',productId,'reviews'],getReviews);

    const mutation=useMutation(newReview=>{
        return axios.post(`http://morning-waters-03754.herokuapp.com/api/products/${productId}/reviews/create`,newReview)
    })

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

    const formik = useFormik({
        initialValues:{
            name:'',
            rating:'',
            review:''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
            rating: Yup.number().required('Required').min(0).max(5),
            review: Yup.string().max(30,'Must be less than 30 characters').required('Required')
        }),
        onSubmit:values=>{ 
            mutation.mutate(
                {
                    "user_name": values.name,
                    "Rating": values.rating,
                    "user_review": values.review,
                    "product_id": [productId]
                },
                {
                    onSuccess: async ()=> { await queryClient.refetchQueries(['product',productId,'reviews']);}
                }
                )
            values.name='';
            values.rating='';
            values.review='';
        }
    })

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
                {data.variants.length!==0 ? data.variants.map((variant)=>{
                    return <button className='variant-buttons' key={variant.color} style={{backgroundColor: variant.color}} onClick={()=>{ setCurrentImage(variant?.image) }}></button>
                }) : <h3>No Variants!</h3> }
                {(data['id'] in currentCart)?
                    (<div className='counter'>                
                        <button className='quantity-buttons' disabled={currentQuantity===0?true:false} onClick={ () =>  triggerChangeInQuantity('+')  }>+</button>
                        <p>{currentCart[data['id']]}</p>
                        <button className='quantity-buttons' disabled={currentQuantity===data['quantity']?true:false} onClick={ () =>  triggerChangeInQuantity('-')  }>-</button>
                    </div>):
                    <button className='add-to-cart-button' onClick={addToCart}>Add to Cart</button>
                }
                <div className='create-reviews-div'>
                    <h3>Create your Review here!</h3>
                    <form onSubmit={formik.handleSubmit} className='create-reviews-form' autoComplete='off'>
                        <label htmlFor='name'/>
                        <input id='name' name='name' type='text' placeholder='Name' {...formik.getFieldProps('name')} required></input>
                        {formik.touched.name && formik.errors.name ? (<div className='formik-errors'>{formik.errors.name}</div>) : null}
                        <label htmlFor='rating'/>
                        <input id='rating' name='rating' type='number' placeholder='Rating' {...formik.getFieldProps('rating')} required></input>
                        {formik.touched.rating && formik.errors.rating ? (<div className='formik-errors'>{formik.errors.rating}</div>) : null}
                        <label htmlFor='review'/>
                        <input id='review' name='review' type='text' placeholder='Review' {...formik.getFieldProps('review')} required></input>
                        {formik.touched.review && formik.errors.review ? (<div className='formik-errors'>{formik.errors.review}</div>) : null}
                        <button type='submit' className='create-reviews-button'>Create Review</button>
                    </form>
                    
                </div>
                <div className='product-reviews'>
                    <h3>All Reviews</h3>
                    {
                        (reviewData?reviewData.map((review)=>(<div className='each-customer-review' key={review.id}>
                            <p><strong>Customer</strong>: {review.user_name} </p>
                            <p><strong>Rating</strong>: {String.fromCharCode(11088).repeat(review.Rating)}</p>
                            <p><strong>Review</strong>: {review.user_review}</p>
                        </div>)):<h3>Loading..</h3>)
                    }
                </div>
            </div>
        </div>
    )

}
export default Product;