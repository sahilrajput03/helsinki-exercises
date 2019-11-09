import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Love = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState("")
    const [showAll, setShowAll] = useState(true)

    const hook = () => {
        // console.log('effect is asynchronous, I got late fetching notes from the server')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                // console.log('promimse fulfilled')
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    const renderer = () => {
        if (countries.length !== 0) {

            if (showAll) {  /*          if (search === "") {         */
                return (
                    // <div>{countries.map((t) => (<p key={t.name}>{t.name}</p>))}</div>
                    <div>All countries data is fetched. You may search your query above.</div>
                )
            }
            else {
                let countriesMatched = countries.filter(
                    (cv, idx, arr) => {
                        let t = cv.name.toUpperCase()
                        return t.match(search.toUpperCase()) !== null
                    }
                )
                let pp = countriesMatched.map((countryObject) => (<p key={countryObject.name}>{countryObject.name}</p>))

                if (pp.length > 10) {
                    return (<div>Too many matches, specify another filter</div>)
                } else if (pp.length > 1) {
                    let showItNow = (countryObject)=>{
                        setSearch(countryObject.name)
                    }
                    return (
                        <div>
                            {countriesMatched.map((countryObject) => (<p key={countryObject.name}>{countryObject.name}<button onClick={()=>(showItNow(countryObject))}>Show</button></p>))}
                            {/* {pp} */}
                        </div>
                    )
                } else if (pp.length === 1) {
                    let temporal = countriesMatched[0].languages.map(
                        (tuv) => (<li key={tuv.name}>{tuv.name}</li>)
                    )
                    return (
                        <div>
                            <h1>{countriesMatched[0].name}</h1>
                            Capital: {countriesMatched[0].capital}<br></br>
                            Population: {countriesMatched[0].population}
                            <h2>Languages:</h2>
                            {temporal}  <br></br><br></br>
                            <img style={{ width: 150, height: 150 }} src={countriesMatched[0].flag} alt=""></img>
                        </div>
                    )
                }

            }
        }
        else {
            return (<p> Countries Data not fetched yet. wait...</p>)
        }
    }

    const handleSearchChange = function (event) {
        if (event.target.value !== "")
            setShowAll(false)
        else
            setShowAll(true)
        setSearch(event.target.value)
    }

    return (
        <div>
            <p>Search for country here..</p>
            <input value={search} onChange={handleSearchChange} placeholder="Search.."></input>
            <hr></hr>
            {renderer()}
        </div>
    )
}

ReactDOM.render(<Love />, document.getElementById("root"))