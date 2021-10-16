const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("connected to DB");
  })
  .catch((error) => {
    console.log("error connecting to DB");
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
