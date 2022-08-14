import Card from './Card'
import './home-styling.css'
import { getAllProducts } from '../apis/ProductApis';
import { useQuery } from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom'

function Home(){
    const navigate=useNavigate();
    const {data,status,isFetching}=useQuery(["allProducts"], getAllProducts )

    if (status==='error')
        return <h1>Please try later, Server Down</h1>

    if (status==='loading' || isFetching)
        return <h1>Please wait, fetching data</h1>
    
    return (
        <>
        <div className="ribbon-container">
            <h1>Products</h1>
            <button className="create-product-button" onClick={()=>{navigate("/products/create")}}>Create Product</button>
        </div>
        <div className='cards-container'>
            {
                data.map((element)=>{
                    return (
                        <button onClick={()=>{navigate(`/products/${element['id']}`)}} className='card' key={element['id']}>
                            <Card data={element} />
                        </button>
                    )
                })
            }
        </div>
        </>
    )
}
export default Home;