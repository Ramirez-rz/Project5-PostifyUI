import {useState,useEffect} from 'react'

const useFetch = (url) => {
    const[loading,setLoading] = useState(false);
    const[data,setData]=useState([]);
    const[error,setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setData([]);
            setError(null);
            setLoading(false);
            return;
        }

        const getData = async () => {
            try{
                setLoading(true)
                setError(null);
                const res = await fetch(url)
                if (!res.ok){
                    const response = await res.json()
                    const detail = Array.isArray(response.detail) ? response.detail[0]?.msg : response.detail;
                    throw new Error(detail || res.status)
                }
                const response = await res.json()
                setData(response)
            } catch (error){
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getData();
    },[url]);

    return{
        data,
        loading,
        error
    }


}

export default useFetch
