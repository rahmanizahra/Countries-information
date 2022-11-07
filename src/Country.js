import React from 'react';


export default function Country({name,capital,flag,population,language}) {
  return (
   <>
    
      <div className='main-container'>
        <img className="imag" src={flag} alt=""/>
        <h1 className='nameOfCountry'>{name}</h1>
        <p className='data'>Capital: {capital}</p>
        <p className='data'>Languages: {language}</p>
         <p className='data'>Population: {population}</p>
      </div>
   
    
   </>
  )
}
