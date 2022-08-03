import axios from 'axios'
export const getReviews = async ({ queryKey }) => {
    const  {data}  = await axios.get(
      `https://obscure-refuge-62167.herokuapp.com/products/${queryKey[1]}/reviews`
    );
    return data;
};
