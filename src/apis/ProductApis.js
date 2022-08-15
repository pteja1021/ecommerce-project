import axios from 'axios'
const getReviews = async ({ queryKey }) => {
    const  {data}  = await axios.get( `http://morning-waters-03754.herokuapp.com/api/products/${queryKey[1]}/reviews` );
    return data;
};
const getAllProducts = async()=>{
    const { data } = await axios.get("https://morning-waters-03754.herokuapp.com/api/products/");
    return data;
}
const getSingleProduct = async ({ queryKey }) => {
  const  {data}  = await axios.get( `http://morning-waters-03754.herokuapp.com/api/products/${queryKey[1]}` );
  return data;
};
export {getReviews,getAllProducts,getSingleProduct}