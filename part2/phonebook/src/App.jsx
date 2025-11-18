import { useState, useEffect } from "react";
import { SearchFilter, Phonebook, Person, EmptyPerson } from "./phonebook";
import * as phonebookService from "./api";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons =
    persons &&
    persons.filter((person) =>
      person?.name?.toLowerCase().includes(filter.toLowerCase())
    );

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingPerson =
      persons && persons.find((person) => person?.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
      id: generateValidId(),
    };
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        phonebookService
          .updatePerson(existingPerson.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response : person
              )
            );
          });
      }
    } else {
      phonebookService.createPerson(newPerson).then((response) => {
        setPersons(persons && persons?.concat(response));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const deletePerson = (id) => {
    phonebookService.deletePerson(id).then(() => {
      setPersons(persons && persons.filter((person) => person.id !== id));
    });
  };

  const generateValidId = () => {
    if (persons.length === 0) {
      return "0";
    } else {
      const maxId =
        Math.max(...(persons && persons.map((person) => person.id))) + 1;
      return String(maxId);
    }
  };

  useEffect(() => {
    phonebookService.getAllPersons().then((response) => setPersons(response));
  }, []);

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
      {filteredPersons && filteredPersons.length === 0 ? (
        <EmptyPerson />
      ) : (
        filteredPersons?.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))
      )}
    </div>
  );
};

export default App;
