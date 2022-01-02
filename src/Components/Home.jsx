import { Nav, Navbar } from 'react-bootstrap';
import { LoginContext } from '../Context/LoginProvider';
import HomeBodyCards from './HomeBodyCards';
import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import HomeBody from './HomeBody';
import './Home.css';

const Home = () => {

  const {  equipoS } = useContext(LoginContext)


  return (
    <section className="padre-Login">
      <div className="login-Assets">
        <div className="padre-Login-texto">
          <h1 className="titulo-Home"><b>SuperHeroes</b></h1>
          <Navbar className="navBar-Home"  variant="dark">
            <Nav className="me-auto" style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
              <NavLink exact to="creaEquipo" style={{ textDecoration: "none", color: "white" }}>Crear Equipo</NavLink>
            </Nav>
          </Navbar>
        </div>
      </div>
      {
        equipoS.length > 0
          ? <HomeBodyCards equipoS={equipoS} />
          : <HomeBody />
      }
    </section>
  )
}

export default Home
