import * as React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css'
import logo from '../../images/logo.svg'

import { login_student } from '../../actions/Login';

export default function AlunoLogin({ isAuthorized, setAuthorized }) {
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async () => {
        let student = await login_student(cpf, password);
        if(student.data !== undefined) {
            const returnPathname = sessionStorage.getItem('lastPage') ?? '/';
            sessionStorage.removeItem('lastPage');
            localStorage.setItem('authorized', 'true')
            localStorage.setItem('cpf', cpf)
            setAuthorized(true)
            return(
                <Navigate to={returnPathname} replace></Navigate>
            );
        } else {
            setCpf('')
        }
    }

    function onCpfChange(value) {
        if(value >= 0) {
            setCpf(value)
        }
    }

    if (isAuthorized == true) {
        const returnPathname = sessionStorage.getItem("lastPage") ?? "/vagas";
        sessionStorage.removeItem("lastPage");
        return(
            <Navigate to={returnPathname} replace></Navigate>
        );
    }

    return (
        <div className='logInBackground'>
            <div className='popup'>
                <img src={logo} alt='Estágio Hoje' />
                <div className='container'>
                    <div className="popupForm">
                        <h1>Aluno</h1>
                        <p>CPF</p>
                        <input
                            id='cpf'
                            name='cpf'
                            type='text'
                            value={cpf}
                            onChange={(e) => onCpfChange(e.target.value)}
                        />
                        <p>Senha</p>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='highButton' onClick={login}>Login</button>
                    </div>
                    <div className='extraButtons'>
                        <button onClick={() => navigate("/cadastro")}>Não possui cadastro?</button>
                    </div>
                </div>
            </div>
        </div>
      )
}