import React, {useState} from 'react';
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [descrition, setDescrition] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            descrition,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId,
                }
            });

        history.push('/profile');
        }catch(erro){
            alert('Erro ao cadastrar o caso');
        }

    }


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar o Herói para resolver isso.</p>
                    
                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041" />Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição" value={descrition} onChange={e => setDescrition(e.target.value)} />
                    <input placeholder="Valor em R$" value={value} onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}