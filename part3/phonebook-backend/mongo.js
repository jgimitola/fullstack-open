const mongoose = require("mongoose");

const args = process.argv;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (args.length >= 3) {
  const password = args[2];
  const name = args[3];
  const number = args[4];
  const URI = `mongodb+srv://admin:${password}@cluster0.ull5t.mongodb.net/phonebook?retryWrites=true&w=majority`;
  mongoose.connect(URI);

  if (name && number) {
    const person = new Person({
      name,
      number,
    });
    person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
  } else if (!name && !number) {
    Person.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((p) => {
        console.log(p.name, p.number);
      });
      mongoose.connection.close();
    });
  }
} else {
  console.log("error: password must be provided.");
}
