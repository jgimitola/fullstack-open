const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
morgan.token("body", (req, res) => JSON.stringify(req.body));

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${data.length} people <br/> ${new Date()}`);
});

app.get("/api", (req, res) => {
  res.send("Phonebook API");
});

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name || !person.number) {
    res.status(400).json({ error: "Name and number must be sent" });
  } else {
    const names = data.map((p) => p.name);
    const exists = !!names.find((n) => n === person.name);
    if (!exists) {
      const newId = 1 + Math.max(...data.map((p) => p.id));
      person.id = newId;
      data.push(person);
      res.status(201).json(person);
    } else {
      res.status(409).json({ error: "Name must be unique" });
    }
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: `The person with id ${id} was not found` });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((p) => p.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
