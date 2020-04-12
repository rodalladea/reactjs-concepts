import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

import Item from './components/Item';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: 'b02734ec-f39a-41bd-8825-714de6e399ed',
      title: 'Umbriel',
      url: 'https://github.com/Rocketseat/umbriel',
      techs: [
        'Node',
        'Express',
        'TypeScript'
      ],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    
    await api.delete(`repositories/${id}`);

    let allRepositories = [...repositories];

    const index = allRepositories.findIndex(repository => repository.id === id);
    allRepositories.splice(index, 1);

    setRepositories(allRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <Item key={repository.id} repository={repository} remove={handleRemoveRepository} />)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
