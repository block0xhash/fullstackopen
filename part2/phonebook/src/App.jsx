import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
);

const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map(person => (
      <Person key={person.id} person={person} onDelete={() => onDelete(person.id)} />
    ))}
  </div>
);

const Person = ({ person, onDelete }) => (
  <p>
    {person.name} {person.number}
    <button onClick={onDelete}>delete</button>
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setNotification({ message: `Updated ${newName}'s number`, type: 'success' });
            setTimeout(() => {
              setNotification({ message: null, type: '' });
            }, 5000);
          })
          .catch(error => {
            setNotification({ message: `The person '${existingPerson.name}' was already deleted from server`, type: 'error' });
            setPersons(persons.filter(p => p.id !== existingPerson.id));
            setTimeout(() => {
              setNotification({ message: null, type: '' });
            }, 5000);
          });
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotification({ message: `Added ${newName}`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        });
    }
  };

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification({ message: `Deleted ${person.name}`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        })
        .catch(error => {
          setNotification({ message: `Information of '${person.name}' has already been removed from server`, type: 'error' });
          setPersons(persons.filter(p => p.id !== id));
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onNameChange={(event) => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
