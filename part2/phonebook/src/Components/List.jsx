import Person from "./Person";

const List = ({
  filteredPersons,
  stateModifiers,
  persons,
  showErrorMessage,
}) => (
  <div>
    {filteredPersons.map(({ id, name, number }) => (
      <Person
        key={id}
        id={id}
        name={name}
        number={number}
        stateModifiers={stateModifiers}
        persons={persons}
        showErrorMessage={showErrorMessage}
      />
    ))}
  </div>
);

export default List;
