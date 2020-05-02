import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  // Acesso ao valor digitado no input
  const [ newRepo, setNewRepo ] = useState('');
  // Armazenando os repositórios
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // Lidando com a adição de novos repositórios
  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    // Adição de um novo repositório
    // Consumir API do Github
    const response = await api.get(`repos/${newRepo}`);

    // Salvar novo repositório no estado
    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo('');
  }

  return (
    <>
      {/* Header da aplicação */}
      <img src={logoImg} alt="Github Explorer"/>
      <Title>Explore repositórios no Github</Title>

      {/* Input de pesquisa de repositórios */}
      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/* Card com o repositorio */}
      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
}

export default Dashboard;
