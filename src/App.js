import React from "react";
import './App.css';
import Country from './Country';
import { nanoid } from 'nanoid';




function App() {
  const [countriesData,setCountriesData]=React.useState([])
  const [isSearched ,setIsSearched]= React.useState(false)
  const [search,setSearch] = React.useState("")
  const [popIsClicked,setPopIsClicked] = React.useState(true)
  const [lanIsClicked,setLanIsClicked] = React.useState(false)
  React.useEffect(() => {
    fetch("https://restcountries.com/v2/all")
    .then(res =>res.json())
    .then(data => setCountriesData(data))
  },[])
   
  const serachResault = countriesData.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
  const lengthOfResult = serachResault.length
  const nameAndPopulationArray = countriesData.map(country => {
    return (
      {name:country.name,
      population: country.population,
     }
    )
  })
 
  const highToLowPopulation = nameAndPopulationArray.sort(function(a,b){return b.population-a.population})
  const tenCrowededCountries = highToLowPopulation.slice(0,10)

  const Languages = ["English","French","Arabic","Spanish","Portugue","Russian","Dutch","German","Chinese","Serbian"]
  const percentOfLanguage = [91,45,25,24,10,8,8,7,5,4]

  function handleChange(e){
    setSearch(e.target.value);
    setIsSearched(true);
     
  }
 
  return (
    <div className="App">
    
      <div className='title-container'>
        <h1 className='title'>World Countries Data</h1>
        <h1 className='title2'>Currently, we have 250 countries</h1>
        <div className="search-container">
          <input 
          className="search" 
          type="search"
          placeholder="Search countries by name"
          onChange={handleChange}
          value={search}
           />
           {isSearched && <h4 className="result-line">{lengthOfResult} satisfied the search criteria</h4> }
        </div>
     </div>
        <div className='grid-container'>
          {!isSearched ?
          countriesData.map(country => {
          return(
          <Country 
           key={nanoid()}
           name={(country.name).toUpperCase()}
           capital={country.capital}
           flag={country.flag}
           population={country.population}
           language={country.languages.map(language => {return language.name})}
           
           />
          )}) :
           serachResault.map(country =>{
             return(
               <Country
               key={nanoid()}
               name={(country.name).toUpperCase()}
               capital={country.capital}
               flag={country.flag}
               population={country.population}
               language={country.languages.map(language => {return language.name})}
             />)
           })}
        </div>
        <div className="button-part">
            <div className="buuton-container">
              <button className="button" onClick={()=>{setPopIsClicked(true);setLanIsClicked(false)}}>POPULATION</button>
              <button className="button" onClick={()=>{setLanIsClicked(true);setPopIsClicked(false)}}>LANGUAGES</button>  
            </div>
            {popIsClicked &&  <h3>10 Most populated countries in the world</h3>}
            {lanIsClicked && <h3>10 Most spoken languages in the world</h3>}
        </div>
       {popIsClicked &&
       <div className="barChart">
             <div className="nameOfCountries"> 
               {tenCrowededCountries.map(country => <p className="name-table">{country.name}</p>)}
             </div>
             <div className="country-population">
                 <div className="bar" style={{width:"18% ",height:"35px",marginTop:"25px"}}> </div>
                 <div className="bar" style={{width:"18% ",height:"35px",marginTop:"25px"}}> </div> 
                 <div className="bar" style={{width:"4% ",height:"35px",marginTop:"25px"}}> </div> 
                 <div className="bar" style={{width:"4% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"3% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"3% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"3% ",height:"35px",marginTop:"25px"}}> </div>
                  <div className="bar" style={{width:"2% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"2% ",height:"35px",marginTop:"25px"}}> </div>  
                  <div className="bar" style={{width:"2% ",height:"35px",marginTop:"25px"}}> </div> 
             </div>              
             <div className="population">
                {tenCrowededCountries.map(country => <p className="name-table">{country.population}</p>)}
             </div>
             
        </div> }
        
       {lanIsClicked &&
       <div className="barChart">
         <div className="nameOfLanguages">
           {Languages.map(language => <p className="language-table">{language}</p>)}
         </div>
         <div className="country-languages">
                 <div className="bar" style={{width:"91% ",height:"35px",marginTop:"25px"}}> </div>
                 <div className="bar" style={{width:"45% ",height:"35px",marginTop:"25px"}}> </div> 
                 <div className="bar" style={{width:"25% ",height:"35px",marginTop:"25px"}}> </div> 
                 <div className="bar" style={{width:"24% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"10% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"8% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"8% ",height:"35px",marginTop:"25px"}}> </div>
                  <div className="bar" style={{width:"7% ",height:"35px",marginTop:"25px"}}> </div> 
                  <div className="bar" style={{width:"5% ",height:"35px",marginTop:"25px"}}> </div>  
                  <div className="bar" style={{width:"4% ",height:"35px",marginTop:"25px"}}> </div> 
             </div> 
             <div className="percentage">
                {percentOfLanguage.map(number => <p className="name-table">{number}</p>)}
             </div>

        </div>
       }
        
       <hr></hr>
       <footer className="footer">
                   <h3>Copyright ©2020 30 Days Of React</h3>
                   <h4>Build by <a href="https://github.com/rahmanizahra" target="_blank" rel="noreferrer">Zahra Rahmani</a></h4>
       </footer>   
  
  </div>
  );
}

export default App;
