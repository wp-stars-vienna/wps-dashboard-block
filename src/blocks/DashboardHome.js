// import "../frontend.scss"
import React, {useState, useEffect} from "react"
import changeDashPage from '../utils'
import axios from "axios"
import { useForm } from "react-hook-form"
import Header from './Header'
import Navbar from './Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    Link
  } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import Button from "react-bootstrap/Button"


const DashboardHome = ({changePage, currentPage, ...props}) => {

    useEffect(() => {
    }, [])

    return (
        <Container fluid className={"dashboard-contentwrapper"}>
            <Row>
                <Col xs={8}>
                    <div className={"card shadow-sm rounded"}>
                        <div className={"card-title px-3 py-2"}>
                            <h5>Lehrstellen</h5>
                        </div>
                        <div className={"card-body bg-light d-flex flex-column justify-content-center align-items-center"}>
                            <Link className={"d-flex flex-column text-primary"} to={`${props.dash_url}lehrstellen/new`}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                neue Lehrstelle erstellen
                            </Link>
                        </div>
                        <div className={"card-footer d-flex justify-content-around bg-white px-3 py-2"}>
                            <Link to={`${props.dash_url}lehrstellen`}>
                                <Button variant={"info"}>Alle Lehrstellen</Button>
                            </Link>
                            <Link to={`${props.dash_url}lehrstellen/draft`}>
                                <Button variant={"info"}>Entwürfe</Button>
                            </Link>
                            <Link to={`${props.dash_url}lehrstellen/expired`}>
                                <Button variant={"info"}>Abgelaufen</Button>
                            </Link>
                        </div>
                    </div>
                </Col>  
            </Row>
        </Container>
    )
}

export default DashboardHome
