import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setFilteredPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(({ data }) => {
      setPersons(data);
      setFilteredPersons(data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPersons = [
      ...persons,
      { name: newName, number: newNumber, id: persons.length + 1 },
    ];

    if (persons.findIndex((p) => p.name === newName) === -1) {
      setPersons(newPersons);
      setFilteredPersons([...newPersons]);
      setFilter("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    const fil = event.target.value;
    if (fil.length > 0) {
      console.log(fil);
      setFilteredPersons(
        persons.filter((p) => p.name.toLowerCase().includes(fil))
      );
    } else {
      setFilteredPersons([...persons]);
    }
    setFilter(fil);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
