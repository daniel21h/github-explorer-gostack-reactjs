import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string
  }
}

const Dashboard: React.FC = () => {
  // Acesso ao valor digitado no input
  const [ newRepo, setNewRepo ] = useState('');
  // Armazenando os repositórios
  const [repositories, setRepositories] = useState([]);

  // Lidando com a adição de novos repositórios
  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    // Adição de um novo repositório

    // Consumir API do Github
    const response = await api.get(`repos/${newRepo}`);

    // Salvar novo repositório no estado
    setRepositories([...repositories, repository]);
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
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/57191791?s=460&u=534eccc898167f9c23f52d9a0c6ca2afe27f0197&v=4"
            alt="Daniel Hessel"
          />
          <div>
            <strong>daniel21h/be-the-hero</strong>
            <p>be-the-hero_ Resultado da 11º ediçao da Semana Omnistack utilizando Node.js, ReactJS e React Native</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
}

export default Dashboard;
