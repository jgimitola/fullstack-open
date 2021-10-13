import { useState, useEffect } from "react";
import "./index.css";

import contactService from "./services/contactService";

import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import List from "./Components/List";
import Message from "./Components/Message";

const App = () => {
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    contactService.getAll().then((fetchedPersons) => {
      setPersons(fetchedPersons);
      setFilteredPersons(fetchedPersons);
    });
  }, []);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 2500);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2500);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const position = persons.findIndex((p) => p.name === newName);
    if (position === -1) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      contactService.create(newPerson).then(() => {
        const newPersons = [...persons, newPerson];
        setPersons(newPersons);
        setFilteredPersons([...newPersons]);
        setFilter("");

        showSuccessMessage(`${newPerson.name} has been added.`);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...persons[position], number: newNumber };
        contactService.update(updatedPerson).then((data) => {
          const newPersons = persons.map((p) =>
            p.id !== updatedPerson.id ? p : updatedPerson
          );
          setPersons(newPersons);
          setFilteredPersons([...newPersons]);
          setFilter("");

          showSuccessMessage(
            `${updatedPerson.name}'s number has been updated.`
          );
        });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleChangeFilter = (event) => {
    const fil = event.target.value;
    if (fil.length > 0) {
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

      <Message type="success" message={successMessage} />
      <Message type="error" message={errorMessage} />

      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={(event) => {
          setNewName(event.target.value);
        }}
        handleChangeNumber={(event) => {
          setNewNumber(event.target.value);
        }}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <List
        filteredPersons={filteredPersons}
        persons={persons}
        stateModifiers={{ setPersons, setFilteredPersons }}
        showErrorMessage={showErrorMessage}
      />
    </div>
  );
};

export default App;
