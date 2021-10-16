require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();
morgan.token("body", (req, res) => JSON.stringify(req.body));

const PORT = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

app.get("/info", (req, res) => {
  Person.count({}).then((count) => {
    res.send(`Phonebook has info for ${count} people <br/> ${new Date()}`);
  });
});

app.get("/api", (req, res) => {
  res.send("Phonebook API");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.post("/api/persons", (req, res) => {
  const person = new Person(req.body);
  if (!person.name || !person.number) {
    res.status(400).json({ error: "Name and number must be sent" });
  } else {
    const exists = false;
    if (!exists) {
      person.save().then(() => {
        res.status(201).json(person);
      });
    } else {
      res.status(409).json({ error: "Name must be unique" });
    }
  }
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: `Person id=${id} was not found` });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndUpdate(id, req.body, { new: true })
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: `Person id=${id} was not found` });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
