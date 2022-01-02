import { Form, FormControl, Navbar } from 'react-bootstrap'
import { LoginContext } from '../Context/LoginProvider';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import CardsSupers from './CardsSupers';
import React, { useRef } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import './CreaEquipo.css'

const initialState = {
    superheroe: ''
}

const CreaEquipo = () => {

    const { equipoSuperheroe, equipoS } = useContext(LoginContext)
    const [resultadoBusqueda, setresultadoBusqueda] = useState([])
    const [buscador, setbuscador] = useState(initialState)
    const ref = useRef()


    const buscadorBoton = async (e) => {
        if (buscador.superheroe) {
            e.preventDefault()
            const url = `https://superheroapi.com/api.php/1226195731181241/search/${buscador.superheroe}`
            const datosBusqueda = await axios.get(url);
            const resultado = await datosBusqueda.data.results
            setresultadoBusqueda(resultado)
            console.log(resultado);
        }
    }

    const formulario = (e) => {
        setbuscador({
            ...buscador,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {


        if (resultadoBusqueda) {
            if (resultadoBusqueda.length > 0) {
                ref.current.className = 'cards-CreaE padding'
            } else ref.current.className = 'cards-CreaE'
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultadoBusqueda])

    return (
        <section className="padre-Login-CreaE">
            <div className="login-Assets-CreaE">
                <div className="padre-Login-texto-CreaE">
                    <NavLink exact to="/" style={{
                        backgroundColor: "rgb(32, 48, 56)",
                        textDecoration: "none",
                        color: "white"
                    }}>
                        <h1 style={{ color: "darkturquoise" }}>SuperHeroes</h1>
                    </NavLink>
                    <Navbar className="navBar-CrearE" variant="dark">
                        <Form className="d-flex" style={{ width: "100%" }}>
                            <FormControl
                                name="superheroe"
                                onChange={formulario}
                                value={buscador.superheroe}
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button onClick={buscadorBoton} variant="outline-success">Search</Button>
                        </Form>
                    </Navbar>
                </div>
            </div>
            <div ref={ref} className="cards-CreaE" style={{ width: "100%" }}>
                {
                    resultadoBusqueda ? resultadoBusqueda.map(el => {
                        return <CardsSupers
                            el={el} key={el.id}
                            equipoSuperheroe={equipoSuperheroe}
                            equipoS={equipoS}
                        />
                    }) : false
                }
            </div>
        </section>
    )
}

export default CreaEquipo
