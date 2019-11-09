import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import phoneService from './services/phonuu'
import './index.css'


const Notification = ({ messageErr, messageSucc }) => {
    if (messageErr === null && messageSucc === null) {
        return null
    } else if (messageErr === null) {
        console.log("Green message.");
        return (
            <div className="successMagic">
                {messageSucc}
            </div>
        )
    }
    else {
        console.log("Red message.");
        return (
            <div className="error">
                {messageErr}
            </div>
        )
    }
}



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


const Persons = ({ search, persons, setPersons, setErrorMessage }) => {
    let s = search
    if (s === "") {
        const deleteThing = (id) => {
            console.log("Person with id: ", id, " will be be deleted if pressed OK.");
            const toBeDeletedPerson = persons.find((t) => t.id === id)
            if (window.confirm(`You really want to delete ${toBeDeletedPerson.name}`)) {
                setPersons(persons.filter((pappu) => (pappu.id !== id)))
                console.log("id:", id, " deletednote:", JSON.stringify(toBeDeletedPerson));
                phoneService
                    .deleteIt(id, toBeDeletedPerson)
                    .then(response => {
                        console.log("id:", id, " deletednote:", JSON.stringify(toBeDeletedPerson));
                        setErrorMessage(`${toBeDeletedPerson.name} is deleted from the phonebook.`)
                        setTimeout(() => { setErrorMessage(null) }, 5000)
                    })
                // even passing the then(like above) method won't break the program.
            } else {
                // console.log("okay, its preserved here.");
            }
        }
        return persons.map((p) => (
            <p key={p.id}>
                {p.name} : {p.number}
                <button onClick={() => (deleteThing(p.id))}>Delete</button>
            </p>
        )); //for all shown 
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
        return arr.map((a) => (<p key={persons[a].id} >{persons[a].name} : {persons[a].number}</p>))    //for searched selected shown 
    }
}

const App = () => {
    const [newName, setNewName] = useState('')
    const [persons, setPersons] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    //OLDER HARD CODED PERSON OBJECTS BELOW
    // const [persons, setPersons] = useState([
    //     { name: 'Arto Hellas', number: '040-123456' },
    //     { name: 'Ada Lovelace', number: '39-44-5323523' },
    //     { name: 'Dan Abramov', number: '12-43-234345' },
    //     { name: 'Mary Poppendieck', number: '39-23-6423122' }
    // ])

    const hook = () => {
        // console.log('effect is asynchronous, I got late fetching notes from the server')
        phoneService
            .getAll()
            .then(response => {
                // console.log('promimse fulfilled')
                setPersons(response)
            })
    }

    useEffect(hook, [])

    const [newNumber, setNewNumber] = useState("")
    const [search, setSearch] = useState("")

    const addName = (event) => {
        event.preventDefault()
        let t = persons.find((t) => t.name === newName)
        if (t !== undefined) {
            const m = window.confirm(`${t.name} is already added to phonebook, replace the old number with a new one?`)// use of template string.
            if (m) {
                t = { ...t, number: newNumber }
                phoneService
                    .update(t.id, t)
                    .then((response) => {

                        

                        console.log(response);
                        console.log("updateexecuted");
                        //getting all with updated one
                        phoneService
                            .getAll()
                            .then(response => {
                                setPersons(response)
                                console.log("getallexecuted");
                                setSuccessMessage(`Note: ${t.name}'s number is updated successfully.`)
                                setTimeout(() => { setSuccessMessage(null) }, 5000)
                            })
                    })
                    .catch(error => {
                        // alert(`"${t.name}" was already deleted from server`)
                        console.log("catch-error-body");
                        setErrorMessage(`Failure: "${t.name}" was already deleted from server.`)
                        setTimeout(() => {setErrorMessage(null)}, 5000)
                        setPersons(persons.filter(p => p.name !== t.name))
                        // setNotes(notes.filter(n => n.id !== id))
                    })

            }

            setNewName("")
            setNewNumber("")
        } else {
            const personObject = { name: newName, number: newNumber }
            phoneService
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(response));

                    // console.log("new contact created , and catch area started");
                    setSuccessMessage(`${personObject.name} is added to the phonebook.`)
                    setTimeout(() => { setSuccessMessage(null) }, 5000)

                })

            // setPersons(persons.concat(personObject))
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

    /* const all = (s) => {
        if (s === "") {
            return persons.map((p) => (<p key={p.name}>{p.name} : {p.number}</p>));
        } else {
            let filter, filterLength, i, j, tmp
            let arr = []
            j = 0
            filter = search.toUpperCase()
            filterLength = filter.length
            for (i = 0; i < persons.length; i++) {
                tmp = persons[i].name.toUpperCase()

                if (tmp.slice(0, filterLength) === filter) {
                    console.log("yes, go on..");
                    arr.push(i)
                }
            }
            return arr.map((a) => (    <p >{persons[a].name} : {persons[a].number}</p>     ))
        }
    } */

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification messageErr={errorMessage} messageSucc={successMessage} />

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
                <Persons search={search} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
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