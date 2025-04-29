
const mongoose = require('mongoose')

// Check if password is provided
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@phonebook.kiokwdh.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=PhoneBook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define schema and model for Person
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// If only password is provided, display all entries
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

// If name and number are provided, add new entry
else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Usage: node mongo.js <password> [name] [number]')
  mongoose.connection.close()
}
