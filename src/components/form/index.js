import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';

export default function Form({refreshList}) {

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [techs, setTechs] = useState('');

    async function AddRepository(e) {
        e.preventDefault();

        const arraytechs = techs.split(',').map(tech => tech.trim());

        const repository = {
            title,
            url,
            techs: arraytechs
        }

        const response = await api.post('repositories', repository);

        if(response.status === 200){
            alert('Repositório salvo com sucesso!');
            refreshList();
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={AddRepository}>
                <div className="form-group">
                    <label>Título</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>URL Github</label>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Tecnologias</label>
                    <input value={techs} onChange={(e) => setTechs(e.target.value)} />
                </div>
                <button type="submit">Gravar</button>
            </form>
        </div>
    );
}