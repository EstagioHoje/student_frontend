import './sidebar.css'
import logo from '../../images/logo.svg'
import '../../images/jobOffers.svg'
import '../../images/handWithPencil.svg'
import '../../images/reportEvaluation.svg'
import '../../images/dataManagement.svg'
import { NavLink } from 'react-router-dom';

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import sidebarButtons from './sidebarButtons.json'

export function Sidebar({ setAuthorized }) {
  const navigate = useNavigate()
  const buttonsList = [];

  function logOut(){
      localStorage.setItem('isAuthorized','false');
      localStorage.removeItem('cpf');
      setAuthorized(false);
      sessionStorage.setItem('lastPage', location.pathname);
      navigate('/login');
  }

  sidebarButtons.forEach((button) => {
    buttonsList.push(
      <NavLink className='navButton' to={button.service}>
        <img src={require(button.imgSrc)} alt={button.imgAlt} />
        <p>{button.imgAlt}</p>
      </NavLink>
    )
  });

  return (
    <div className='sidebar'>
      <img className='logoImage' src={logo} alt='Estágio Hoje' />
      <h1>Aluno</h1>
      <div className='buttonsArea'>
        {buttonsList}
      </div>
      <div className='logOut'>
        <button className='buttons' onClick={() => logOut()}>&lt; Sair</button>
      </div>
    </div>
  )
}