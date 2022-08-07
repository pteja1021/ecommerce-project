import axios from 'axios'
const getReviews = async ({ queryKey }) => {
    const  {data}  = await axios.get( `https://obscure-refuge-62167.herokuapp.com/products/${queryKey[1]}/reviews` );
    return data;
};
const getAllProducts = async()=>{
    const { data } = await axios.get("https://obscure-refuge-62167.herokuapp.com/products");
    return data;
}
const getSingleProduct = async ({ queryKey }) => {
  const  {data}  = await axios.get( `https://obscure-refuge-62167.herokuapp.com/products/${queryKey[1]}` );
  return data;
};
export {getReviews,getAllProducts,getSingleProduct}