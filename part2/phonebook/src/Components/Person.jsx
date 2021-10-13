import contactService from "../services/contactService";

const Person = ({
  id,
  name,
  number,
  stateModifiers,
  persons,
  showErrorMessage,
}) => {
  const { setPersons, setFilteredPersons } = stateModifiers;

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm(`Delete ${name}?`)) {
      contactService
        .remove(id)
        .then(() => {
          const newPersons = persons.filter((p) => p.id !== id);
          setPersons(newPersons);
          setFilteredPersons([...newPersons]);
        })
        .catch(() => {
          showErrorMessage(
            `Information of ${name} has already been removed from the server.`
          );
        });
    }
  };

  return (
    <p>
      {name} {number}
      <button onClick={handleDelete}>Delete</button>
    </p>
  );
};
export default Person;
