import React, { useState, useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import Form from '../../components/form';

export default function Repositories() {

    const [enableForm, setEnableForm] = useState(false);
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        refreshList();
    }, []);

    async function refreshList() {
        const response = await api.get('repositories');
        setRepositories(response.data);
    }

    async function handleRemoveRepository(id) {
        await api.delete(`repositories/${id}`);
        const newList = repositories.filter(item => item.id !== id);
        setRepositories(newList);
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