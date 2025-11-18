import { useState } from "react";
import { SearchFilter, Phonebook, Person, EmptyPerson } from "./phonebook";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setPersons(
      persons.map((person) =>
        person.name === newName
          ? { ...person, number: event.target.value }
          : person
      )
    );
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
      <Phonebook
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      {filteredPersons.length === 0 ? (
        <EmptyPerson />
      ) : (
        filteredPersons.map((person) => (
          <Person key={person.name} person={person} />
        ))
      )}
    </div>
  );
};

export default App;
