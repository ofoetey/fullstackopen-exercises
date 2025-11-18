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

export const Person = ({ person, deletePerson }) => {
  const { name, number, id } = person;

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id);
    }
  };

  return (
    <>
      <div key={name}>
        {name} {number}
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      </div>
    </>
  );
};

export const EmptyPerson = () => {
  return (
    <div>
      <p>No persons found</p>
    </div>
  );
};
