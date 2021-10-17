const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("connected to DB");
  })
  .catch((error) => {
    console.log("error connecting to DB");
  });

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  number: { type: String, minlength: 8 },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

process.on("SIGINT", () => {
  console.log("Closing connection...");
  mongoose.disconnect().then(() => {
    console.log(
      `Connection is closed. State is: ${mongoose.connection.readyState}`
    );
    process.exit(0);
  });
});

module.exports = mongoose.model("Person", personSchema);
