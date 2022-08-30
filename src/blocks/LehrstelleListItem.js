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
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faLocationDot, faCalendar, faPenToSquare, faClock, faStar } from "@fortawesome/free-solid-svg-icons"


const Lehrstellen = ({index, arrLen, lehrstelle, ...props}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    console.log(index, arrLen)
    let addnlClassName = (index < arrLen - 1) ? 'border-bottom' : ''

    const toggleDropdown = (event) => {
        event.preventDefault()
        if(dropdownOpen) {
            setDropdownOpen(false)
        } else {
            setDropdownOpen(true)
        }
    } 
    const deleteLehrstelle = (event) => {
        
    }
    const deactivateLehrstelle = (event) => {
        
    }

    useEffect(() => {
        console.log(lehrstelle)
    })

    return (
        <div className={`lehrstellen-list-item d-inline-flex w-100 justify-content-between p-2 ${addnlClassName}` }>
            <div className={"d-flex flex-column"}>
                <h5>{lehrstelle.post_title}</h5>
                <div className={"reference-number border-bottom text-muted"}>
                    <p>Referenz N*: </p>
                </div>
            </div>
            <div className={"ersteller"}>
                <p className="text-muted"><FontAwesomeIcon style={{ color: '#1D679C' }} icon={faPenToSquare} /> ErstellerIn</p>
                <p className="">User 1</p>
            </div>
            <div className={"standort"}>
                <p className="text-muted"><FontAwesomeIcon style={{ color: '#1D679C' }} icon={faLocationDot} /> Standort</p>
            </div>
            <div className={"status-indicator"}>
                <Button variant={"info"}>aktiv</Button>            
            </div>
            <div className="actions">
                <Button variant="primary" className={"action-button"} onClick={(event) => toggleDropdown(event)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
                {dropdownOpen && 
                    <div className={"dropdown rounded shadow-sm bg-white"}>
                        <a href={"#"}>Vorschau</a>
                        <Link className="btn btn-primary" to={`${props.dash_url}lehrstellen/${lehrstelle.ID}`}>Bearbeiten</Link>
                        <Button variant="primary" onClick={deleteLehrstelle(lehrstelle.id)}>Löschen</Button>
                        <Button variant="primary" onClick={deactivateLehrstelle(lehrstelle.id)}>Deaktivieren</Button>

                    </div>
                }
            </div>
        </div>
    )
}

export default Lehrstellen