import React, { useEffect, useState } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    handleListRepository()
  },[]);

  async function handleListRepository() {
    api.get('repositories').then(response => {
      setProjects(response.data);
    })
  }


  async function handleAddRepository() {
    const response = await api.post('/repositories',{      
      title: 'O projeto foda',
      url: 'https://github.com/DarlanCosta/happy-children-mobile.git',
      techs: ['JAVA', 'Javascript', 'Delphi'],
    });

    setProjects([...projects, response.data])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    setProjects(projects.filter(project => project.id !== id ));

  }

  return (
    <div>
        
      <ul data-testid="repository-list">
        {projects.map((repository) => (
          <li key={repository.id}>
            
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button> 
        
          </li>
          ))
        }
      </ul>
           
          
        
         

      

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
