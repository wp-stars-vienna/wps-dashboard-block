// import "../frontend.scss"
import React, {useState, useEffect} from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Header from './Header'
import Navbar from './Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    Link
} from "react-router-dom"
import LehrstelleCard from './LehrstelleCard'
import LehrstelleListItem from './LehrstelleListItem'
import { faCirclePlus, faList, faTableCells } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Lehrstellen = ({changePage, ...props}) => {
    const [layout, setLayout] = useState('grid')

    const toggleGrid = (event) => {
        event.preventDefault()
        if(layout == 'grid') {
            setLayout('list')
        } else {
            setLayout('grid')
        }
    } 

    return (
        <Container fluid className={"dashboard-contentwrapper lehrstellen"}>
            <Row>
                <Col xs={12} className={"lehrstellen-options"}>
                    <div className={"lehrstellen-top-left"}>

                    </div>
                    <div className={"lehrstellen-top-center"}>

                    </div>
                    <div className={"lehrstellen-top-right"}>
                        <Link className={"btn"} to={`${props.dash_url}lehrstellen/new`}>
                            <FontAwesomeIcon size={"lg"}  style={{ color: '#1D679C' }} icon={faCirclePlus} />
                        </Link>
                        <button className={"btn ml-auto"} onClick={(event) => toggleGrid(event)}>
                            {layout == 'grid' ? 
                                <FontAwesomeIcon size={"lg"}  style={{ color: '#1D679C' }} icon={faList} />
                            :                         
                                <FontAwesomeIcon size={"lg"}  style={{ color: '#1D679C' }} icon={faTableCells} />
                            }
                        </button>
                    </div>
                </Col>
            </Row>
            {layout == 'grid' ? 
                <Row>
                    {props.lehrstelle.map(lehrstelle => {
                        return (
                            <Col xs={4} className={"mb-3"}>
                                <LehrstelleCard {...props} lehrstelle={lehrstelle} />
                            </Col>
                        )
                    })}
                    
                </Row>
            :
                <Row>
                    <Col xs={12}>
                        <div className={"d-flex flex-column bg-white rounded"}>
                            {props.lehrstelle.map((lehrstelle, index) => {
                                return (
                                    <LehrstelleListItem index={index} arrLen={props.lehrstelle.length} lehrstelle={lehrstelle} {...props} />
                                )
                            }) }
                        </div>
                    </Col>
                </Row>
            }
            <Row>
                Put pagination here
            </Row>
        </Container>
    )
}

export default Lehrstellen
