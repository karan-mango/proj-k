import React, { useState } from 'react'

export default function Componets() {
    let [data,setdata]=useState();

  const fetchdata=async ()=>{
    const resp=await fetch('hhttp')
    if(resp.ok){
        const res=await resp.json()
        setdata(res);

    }
    
  }

  
  return (
    <div>
        
        <h1>{data}</h1>
        <button onClick={()=>fetchdata()}></button>



    </div>
  )
}
