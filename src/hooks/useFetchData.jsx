import axios from 'axios';
import React, { useState ,useEffect} from 'react'

function useFetchData(url) {
    const [data,setData]=useState({
        urlData:[],
        loading:false
    })
    useEffect(() => {
        axios.get(url).then((res)=>{
            setData({...data,urlData:res.data});

        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    
  return {data}
}

export default useFetchData