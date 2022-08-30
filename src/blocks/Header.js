// import "../frontend.scss"
import React, {useState, useEffect} from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Button from 'react-bootstrap/Button'


const Header = (props) => {

    useEffect(() => {
    }, [])

    return (
        <div className={"header d-inline-flex w-100"}>
            <nav className={"navbar px-2 w-100 text-white"}>
                <h5 className={"navbar-brand text-white"}>{props.page}</h5>
                <div className={"navbar-right"}>
                    <div className={"profile-picture"}>
                        <img src={props.avatar_url} alt={""} />
                    </div>
                    <span className={"nav-item nav-link ml-auto"} >{props.user_first_name}</span>
                    <Button variant="secondary">v</Button>
                </div>
            </nav>
        </div>
    )
}

export default Header
