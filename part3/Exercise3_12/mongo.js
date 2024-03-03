const mongoose = require('mongoose')

if (process.argv.length<5) {
  console.log('give all arguments')
  process.exit(1)
}

const password = process.argv[2]
const namePerson = process.argv[3]
const numberPerson = process.argv[4]

const url =
  `mongodb+srv://miguelhc95:${password}@cursofullstack.tze93kt.mongodb.net/personApp?retryWrites=true&w=majority&appName=cursoFullStack`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: namePerson,
  number: numberPerson,
})

person.save().then(result => {
  console.log(`Added ${namePerson} ${numberPerson} to phonebook`)
})

Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })