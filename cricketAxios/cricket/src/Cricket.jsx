import { useEffect, useState } from 'react'
import { deleteData, getData } from './api/CricketApi';

const Cricket = () => {
    const[data, setData] = useState([])
    
    
    

    const getApiData = async() => {
        try {
            const res = await getData()
            setData(res.data.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getApiData()
    },[])

    const handleDelete = async (id) => {
      try {
         const res = await deleteData()
         console.log(res);
         

         if(res.status === 201){
            const filterData = data.filter((_, index) => {
              return index!==id
         })
         setData(filterData)
        }
      } catch (error) {
        console.log(error.message); 
      }
    }

  return (
    <ol>
      {
        data.map((curElem) => {
            const {genericFlag, id ,name} = curElem
            return(
                <li key={id}>
                    <h1>Country: {name}</h1>
                    <img src={genericFlag} alt={`${genericFlag} flag`} onClick={() => handleDelete(id)}/>
                </li>
            )
        })
      }
    </ol>
  )
}

export default Cricket
