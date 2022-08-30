// import "../frontend.scss"
import React, {useState, useEffect} from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Header from './Header'
import Navbar from './Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DashboardHome from './DashboardHome'
import Lehrstellen from './Lehrstellen'
import SingleLehrstellen from './SingleLehrstellen'
import Firmenprofil from './FirmenProfil'
import MyPurchases from './MyPurchases'
import UserProfile from './UserProfile'
import Footer from './Footer'
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
  } from "react-router-dom"


const DashboardBlock = (props) => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    
    useEffect(() => {
        
    }, [])

    return (
        <BrowserRouter>
            <Container fluid className={"dashboard-pagewrapper bg-light"}>
                <Row className={"pagewrapper-row"}>
                    <Navbar 
                        changePage={setCurrentPage}
                        currentPage={currentPage}
                        {...props} 
                    />
                    <div className={'dashboard-content p-0'}>
                        <Header page={currentPage} {...props} />
                        <Routes>
                            <Route path={props.dash_url} element={
                                <DashboardHome 
                                    changePage={setCurrentPage}
                                    currentPage={currentPage}
                                    {...props} />
                                } 
                            />
                            <Route path={`${props.dash_url}profile`} element={<UserProfile {...props} />} />
                            <Route path={`${props.dash_url}lehrstellen`} element={<Lehrstellen changePage={setCurrentPage} {...props} />} />
                            <Route path={`${props.dash_url}lehrstellen/:lehrstelleId`} element={<SingleLehrstellen {...props} />} />
                            <Route path={`${props.dash_url}firmenprofil`} element={<Firmenprofil {...props} />} />
                            <Route path={`${props.dash_url}meine-pakete`} element={<MyPurchases {...props} />} />
                        </Routes>
                    </div>
                </Row>
            </Container>
        </BrowserRouter>
    )
}

export default DashboardBlock
