// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

// // // // some build exprmnts...
app.use(express.static('build'))

var morgan = require('morgan')

app.use(bodyParser.json())

// app.use(morgan('combined'))

morgan.token('justBaoddy', function (req, res) {
     return JSON.stringify(req.body) 
    })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :justBaoddy'))
// app.use(morgan(':justBaoddy'))
// app.use(morgan('tiny',':justBaoddy'))  //this doesn't work at all. i.e., using two params are not good with function syntax.
// app.use(morgan('tiny'))


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

//   temporarily commented..
// app.use(requestLogger)


let persons = [
    {
        id: 1,
        name: "Mohit",
        number: "123465",
    },
    {
        id: 2,
        name: "Sahil",
        number: "123465",
    },
    {
        id: 3,
        name: "Anmol",
        number: "123465",
    },
    {
        id: 4,
        name: "Atulya",
        number: "123465",
    },

]

const generateId = () => {
    // const maxId = persons.length > 0
    //     ? Math.max(...persons.map(n => n.id))
    //     : 0
    // return maxId + 1

    return Math.floor((Math.random() * 1000000) + 1);
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'Name is missing'
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: 'Number is missing'
        })
    }
    else if (persons.find((t) => t.name === body.name)) {
        const dd = persons.find((t) => t.name === body.name)
        console.log(dd.name)
        return response.status(400).json({
            error: 'Name must be unique.'
        })
    }


    if (persons.find((t) => t.name === body.name)) {
        const dd = persons.find((t) => t.name === body.name)
        console.log(dd.name)
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})


//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
//   })

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello World')
// })
// initial-code

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for ' + persons.length + ' people.' + '</p><p>' + new Date() + '</p>')
})

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
// })

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(n => n.id === id)
    // response.json(note)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    console.log("...debugging...", "ITEM DELETED WITH ID: ", id);
    response.status(204).end()
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint- Buddy, you have come wrong way.LOL' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001

// console.log(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})