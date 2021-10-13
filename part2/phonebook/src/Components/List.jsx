import Person from "./Person";

const List = ({ filteredPersons, stateModifiers, persons }) => (
  <div>
    {filteredPersons.map(({ id, name, number }) => (
      <Person
        key={id}
        id={id}
        name={name}
        number={number}
        stateModifiers={stateModifiers}
        persons={persons}
      />
    ))}
  </div>
);

export default List;
