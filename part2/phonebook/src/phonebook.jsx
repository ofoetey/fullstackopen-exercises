export const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export const Phonebook = ({
  handleSubmit,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>add a new </h2>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export const Person = ({ person }) => {
  const { name, number } = person;
  return (
    <div key={name}>
      {name} {number}
    </div>
  );
};

export const EmptyPerson = () => {
  return (
    <div>
      <p>No persons found</p>
    </div>
  );
};
