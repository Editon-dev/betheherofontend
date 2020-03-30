import React, {useState, useEffect} from 'react';

import './styles.css'
import {FiPower} from 'react-icons/fi';
import {FiTrash} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Profile () {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    authorization: ongId,
                }
            });

        setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(erro){
            alert('Erro ao deletar');
        }
        
    }

    function handleLogout (){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
            <img src={logoImg} alt="Be The Hero" />
            <span>Bem vinda, {ongName}</span>
            <Link className="button" to="/newincident">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}><FiPower size={18} color="#e02041" /></button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.descrition}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}

            </ul>
        </div>
    )
}