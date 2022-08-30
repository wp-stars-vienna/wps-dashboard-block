// import "../frontend.scss"
import React, {useState, useEffect} from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate,
} from "react-router-dom"
import { changeDashPage } from '../utils'


const Navbar = ({changePage, currentPage, ...props}) => {

    useEffect(() => {
        changeDashPage(changePage, props)
    })

    return (
        <div className={"dashboard-navbar shadow-sm bg-white d-inline-block"}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className="d-flex flex-column">
                            <h5>{'Lehrlingsportal.at'}</h5>
                            <ListGroup>
                                <Link to={`${props.dash_url}`} onClick={() => changePage('Dashboard')}>
                                    <ListGroup.Item className={(currentPage == 'Dashboard') ? 'active shadow-sm rounded bg-light' : 'shadow-sm rounded bg-light'}>
                                        Dashboard
                                    </ListGroup.Item>
                                </Link>
                                <Link to={`${props.dash_url}profile`} onClick={() => changePage('Mein Profil')}>
                                    <ListGroup.Item className={(currentPage == 'Mein Profil') ? 'active  shadow-sm rounded bg-light' : ' shadow-sm rounded bg-light'}>
                                        Mein Profil
                                    </ListGroup.Item>
                                </Link>
                                <Link to={`${props.dash_url}lehrstellen`} onClick={() => changePage('Lehrstellen')}>
                                    <ListGroup.Item className={(currentPage == 'Lehrstellen') ? 'active shadow-sm rounded bg-light' : ' shadow-sm rounded bg-light'}>
                                        Lehrstellen
                                    </ListGroup.Item>
                                </Link>
                                <Link to={`${props.dash_url}firmenprofil`} onClick={() => changePage('Firmenprofil')}>
                                    <ListGroup.Item className={(currentPage == 'Firmenprofil') ? 'active shadow-sm rounded bg-light' : ' shadow-sm rounded bg-light'}>
                                        Firmenprofil
                                    </ListGroup.Item>
                                </Link>
                                <Link to={`${props.dash_url}meine-pakete`} onClick={() => changePage('Meine Pakete')}>
                                    <ListGroup.Item className={(currentPage == 'Meine Pakete') ? 'active shadow-sm rounded bg-light' : ' shadow-sm rounded bg-light'}>
                                        Meine Pakete
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Navbar
