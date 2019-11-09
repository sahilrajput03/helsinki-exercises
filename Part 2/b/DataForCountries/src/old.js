import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const PersonForm = ({ addName, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return (
        <div>
            <form onSubmit={addName}>
                Name:  <input value={newName} onChange={handleNameChange} ></input><br></br><br></br>
                Number: <input value={newNumber} onChange={handleNumberChange}></input><br></br><br></br>
                <div>
                    <button type="submit" >Add to Contacts</button>
                </div>
            </form>
        </div>
    )
}

const Filter = ({ search, handleSearchChange }) => {
    return (
        <input value={search} onChange={handleSearchChange}></input>
    )
}

const Persons = ({ search, persons }) => {
    let s = search
    if (s === "") {
        return persons.map((p) => (<p key={p.name}>{p.name} : {p.number}</p>));
    } else {
        let searchTEXT, searchTEXTlength, i, tmp
        let arr = []
        searchTEXT = search.toUpperCase()
        searchTEXTlength = searchTEXT.length
        for (i = 0; i < persons.length; i++) {
            tmp = persons[i].name.toUpperCase()

            if (tmp.slice(0, searchTEXTlength) === searchTEXT) {
                console.log("yes, go on..");
                arr.push(i)
            }
        }
        return arr.map((a) => (<p >{persons[a].name} : {persons[a].number}</p>))
    }
}

const App = () => {
    const [newName, setNewName] = useState('')
    const [persons,setPersons] = useState([])

    //OLDER HARD CODED PERSON OBJECTS BELOW
    // const [persons, setPersons] = useState([
    //     { name: 'Arto Hellas', number: '040-123456' },
    //     { name: 'Ada Lovelace', number: '39-44-5323523' },
    //     { name: 'Dan Abramov', number: '12-43-234345' },
    //     { name: 'Mary Poppendieck', number: '39-23-6423122' }
    // ])

    const hook = () => {
        console.log('effect is asynchronous, I got late fetching notes from the server')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promimse fulfilled')
                setPersons(response.data)
            })
    }
    
    useEffect(hook, [])
    
    const [newNumber, setNewNumber] = useState("")
    const [search, setSearch] = useState("")

    const addName = (event) => {
        event.preventDefault()
        let t = persons.find((t) => t.name === newName)
        if (t !== undefined) {
            alert(`${t.name} is already added to phonebook`)// use of template string.
            setNewName("")
            setNewNumber("")
        } else {
            const personObject = { name: newName, number: newNumber }
            setPersons(persons.concat(personObject))
            setNewNumber('')
            setNewName('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => (
        setNewNumber(event.target.value)
    )

    const handleSearchChange = (event) => setSearch(event.target.value)

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} handleSearchChange={handleSearchChange} ></Filter>
            {/* <input value={search} onChange={handleSearchChange}></input> */}

            <hr></hr>

            <h3>Add a New Contact:</h3>
            <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></PersonForm>
            {/* <form onSubmit={addName}>
                        Name:  <input value={newName} onChange={handleNameChange} ></input><br></br><br></br>
                        Number: <input value={newNumber} onChange={handleNumberChange}></input><br></br><br></br>
                        <div>
                            <button type="submit" >Add to Contacts</button>
                        </div>
                    </form> */}

            <hr></hr>

            <h3>Numbers</h3>
            <div>
                <Persons search={search} persons={persons} />
                {/* {all(search)} */}
            </div>

            <hr></hr>
            {/* ...debugging area...
            <div>Search(input): {search}</div>
            <div>debug: {JSON.stringify(persons)}</div> */}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))

export default App  