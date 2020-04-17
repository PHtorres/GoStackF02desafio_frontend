import React, { useState, useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import Form from '../../components/form';

export default function Projects() {

    const [enableForm, setEnableForm] = useState(false);
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        refreshList();
    }, []);

    async function refreshList() {
        const response = await api.get('projects');
        setRepositories(response.data);
    }

    async function handleRemoveRepository(id) {
        const response = await api.delete(`projects/${id}`);
        if(response.status === 204){
            alert('Repositório removido com sucesso!');
            refreshList();
        }
    }

    function ShowForm() {
        if (enableForm) {
            return <Form refreshList={refreshList} />
        }

        return <></>
    }

    return (
        <div className="container">
            <h3>List of repositories</h3>
            <button className="addButton" onClick={() => setEnableForm(true)}>Novo repositório</button>
            <ShowForm />
            <ul data-testid="repository-list">
                {repositories.map(item => (
                    <li key={item.id}>
                        <a href={item.url} target="_blank">
                            <span>{item.title}</span>
                        </a>
                        <button className="removeButton" onClick={() => handleRemoveRepository(item.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}