import { useState, useEffect } from 'react';
import axios from 'axios';




const useFetch = (endpoint, query) => {

    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);



const options = {
  method: 'GET',
  url: `https://jsearch.p.rapidapi.com/${endpoint}`,

  headers: {
    'X-RapidAPI-Key': '38d96ee2ffmshb3969a4f120613fp195a33jsnb92099f5174f',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  },
  params: {...query},
};

const fetchData = async () => {
    setIsLoading(true);

    try {
        const response = await axios.request(options)

        setData(response.data.data)
        setIsLoading(false);
    } catch (error) {
        setError(error);
        console.log('there is an error')
    } finally {
        setIsLoading(false)
    }
}

useEffect(() =>{
    fetchData();
}, []);


const refetch = () => {
    fetchData()
}

return { data, isLoading, error, refetch}

}

export default useFetch;