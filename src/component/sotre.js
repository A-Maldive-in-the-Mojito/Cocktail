import { Provider } from 'react-redux';
import { createStore } from 'redux';

// API GET
const getCocktails = async() => {
  const {data: {all_cocktails}} = await axios.get('http://localhost:5000/cocktails');
  console.log(all_cocktails);
};
useEffect(()=> { getCocktails()} );
