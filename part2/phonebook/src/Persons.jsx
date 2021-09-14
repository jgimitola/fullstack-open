const Persons = ({ filteredPersons }) => (
  <div>
    {filteredPersons.map((p) => (
      <p key={p.name}>
        {p.name} {p.number}
      </p>
    ))}
  </div>
);

export default Persons;
