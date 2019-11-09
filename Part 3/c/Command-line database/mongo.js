const mongoose = require('mongoose')

if (process.argv.length < 5 && process.argv.length > 3) {
    console.log('Give command like this: node mongo.js yourpassword Anna 040-1234556')
    process.exit(1)
}

const password = process.argv[2]


const url =
    `mongodb+srv://admin:${password}@cluster0-gmgwu.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true})

const noteSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const numberString = process.argv[4]
    const number = numberString.replace(/-/g, "");
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(response => {
        //   console.log('person saved!')
        console.log(`Added ${name} with ${number} to phonebook successfully.`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    console.log('Phonebook:');
    const Person = mongoose.model('Person', noteSchema)
    Person.find({})
        .then(result => {
            result.forEach(person => {
                // console.log(JSON.stringify(person));
                console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}