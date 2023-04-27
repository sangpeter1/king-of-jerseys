import axios from 'axios';

const products = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    return action.products;
  }
  return state;
};


export const fetchProducts = () => {
    return async(dispatch)=>{
        return dispatch({type: "SET_PRODUCTS", products: (await axios.get('/api/products')).data});
    };
} 

export default products;
