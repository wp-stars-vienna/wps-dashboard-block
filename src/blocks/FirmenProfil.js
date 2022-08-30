// import "../frontend.scss"
import React, {useState, useEffect} from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Header from './Header'
import Navbar from './Navbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Firmenprofil = (props) => {

    const [currentPage, setCurrentPage] = useState('Dashboard');

    useEffect(() => {
    }, [])

    return (
        <Container fluid className={"dashboard-contentwrapper"}>
            <Row>
                Firmenprofil       
            </Row>
        </Container>
    )
}

export default Firmenprofil
