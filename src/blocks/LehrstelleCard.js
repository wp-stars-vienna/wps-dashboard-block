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
import { faEllipsisVertical, faLocationDot, faCalendar, faPenToSquare, faClock, faStar, faUser } from "@fortawesome/free-solid-svg-icons"


const LehrstelleCard = ({lehrstelle, ...props}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

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
        <div className={`${lehrstelle.acf?.top_lehrstelle ? "topjob" : ""} lehrstellen-card shadow-sm rounded`}>
            <div className="card-body bg-white">
                <div className={"card-header w-100 d-inline-flex justify-content-between"}>
                    <h5 className="card-title bg-white text-primary">{lehrstelle.post_title}</h5>
                    <Button variant="primary" className={`${dropdownOpen ? "active" : ""} action-button`} onClick={(event) => toggleDropdown(event)}>
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
                <div className={"reference-number border-bottom text-muted text-small"}>
                    <small className={"text-muted"}>Referenz N*: {lehrstelle?.acf?.identifier}</small>
                </div>
                <div className={"border-bottom row"}>
                    <div className={"col-6 standort"}>
                        <small className="text-muted text-small"><FontAwesomeIcon style={{ color: '#1D679C' }} icon={faLocationDot} /> Standort</small>
                    </div>
                    <div className={"col-6 contact-person"}>
                        <small className="text-muted text-small"><FontAwesomeIcon style={{ color: '#1D679C' }} icon={faUser} /> AnsprechparterIn</small>
                        <p className="">Person</p>
                    </div>
                    <div className={"col-6 start-date"}>
                        <small className="text-muted text-small"><FontAwesomeIcon style={{ color: '#1D679C' }} icon={faCalendar} /> Eintrittsdatum</small>
                        <p className="">01.01.2022</p>
                    </div>
                </div>
                <div className={"additional-data row"}>
                    <div className={"col-6"}>
                        <small className="text-muted text-small"><FontAwesomeIcon style={{ color: '#1D679C' }} icon={faPenToSquare} /> ErstellerIn</small>
                        <p className="">User 1</p>
                    </div>
                    <div className={"col-6"}>
                        <small className="text-muted text-small"><FontAwesomeIcon style={{ color: '#1D679C' }} icon={faClock} /> zuletzt bearbeitet</small>
                        <p className="">User 3</p>
                    </div>
                </div>
                <div className={"status d-flex flex-column w-100"}>
                    <div className={"w-100"}>
                        <small className="text-muted text-small">Status</small>
                    </div>
                    <div class={"w-100 d-inline-flex justify-content-between"}>
                        <Button variant={"info"}>aktiv</Button>
                        <Button variant={(lehrstelle?.acf?.top_lehrstelle) ? "primary" : "tertiary"}>
                            Topjob <FontAwesomeIcon icon={faStar} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LehrstelleCard