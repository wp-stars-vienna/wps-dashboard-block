// import "../frontend.scss"
import React, {useState, useEffect} from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from "@fortawesome/free-solid-svg-icons"



const UserProfile = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: props.user_email
        }
    })
    const [imageUploading, setImageUploading] = useState(false)
    const [profileImage, setProfileImage] = useState(props.avatar_url)


    useEffect(() => {
    }, [])

    const updateUserProfile = (data) => {
        // TODO: split data in order to post to the user and the kontaktperson
        let headers = {
            'Content-Type': 'application/json',
            'X-WP-Nonce': wpApiSettings.nonce
        },
        targetEndpoint = `${props.rest_url}wp/v2/users/me`

        console.log(data)
        console.log(targetEndpoint)
        console.log(headers)
    
        
        axios.post(targetEndpoint, {email: data.email}, {
                headers: headers
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })

    }

    const handleImageBtnClick = (e) => {
        e.preventDefault();
        console.log('upload btn clicked')
        document.querySelector('#image-input').click();
    }

    const setSelectedFile = (file) => {
        setImageUploading(true);
        let imageFormData = new FormData();
        if(file) {
            imageFormData.append("file", file);
            imageFormData.append('title', file.name);     
            axios.post(`${props.site_url}/wp-json/wp/v2/media/`, imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-WP-Nonce': props.nonce
                    }
                })
                .then((res) => {
                    console.log('add image res', res);
                    //debugger;
                    // set image data to existing images arr, id, src etc. 
                    setProfileImage(res.data);
                    setImageUploading(false);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    return (
        <Container fluid className={"dashboard-contentwrapper profile-edit-page"}>
            <Row>
                <Col xs={12}>
                    <div className={"d-flex flex-column align-items-center"}>
                        <div className={"bg-light profile-picture-container"}>
                            <div className="profile-picture-wrapper">
                                <img src={profileImage} alt={""} />
                            </div>
                            <button className="img-upload-btn btn rounded" onClick={(e) => handleImageBtnClick(e)}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                            <input
                                id="image-input"
                                name="profilePicture"
                                className="image-input d-none"
                                type="file"
                                accept="image/*;capture=camera"
                                defaultValue=""
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                        </div>
                        <h5>{props.user_first_name} {props.user_last_name}</h5>
                        <form 
                            className={"profile-edit-form d-flex flex-column w-100"} 
                            onSubmit={handleSubmit(updateUserProfile)}>
                            <div className={"form-section rounded mb-3"}>
                                <Form.Group className="pb-2 d-inline-flex w-100 justify-content-between" controlId="email">
                                    <Form.Label className={"w-50"}>Email address</Form.Label>
                                    <FontAwesomeIcon icon="fas fa-pencil" />
                                    
                                    <Form.Control 
                                        {...register("email", { required: false })}
                                        type="email" 
                                        placeholder="Enter email" 
                                        className={"w-50 border-0"}
                                    />
                                </Form.Group>
                                <Form.Group className="py-2 d-inline-flex w-100 justify-content-between border-top border-bottom" controlId="telefonnummer">
                                    <Form.Label className={"w-50"}>Telefonnummer</Form.Label>
                                    <Form.Control 
                                        // {...register("telefonnummer", { required: false })} 
                                        type="phone" 
                                        placeholder="+43 43 12345678" 
                                        className={"w-50 border-0"}
                                    />
                                </Form.Group>
                                <Form.Group className="pt-2 d-inline-flex w-100 justify-content-between" controlId="password">
                                    <Form.Label className={"w-50"}>Password</Form.Label>
                                    <FontAwesomeIcon icon="fa-solid fa-pencil" />
                                    <Form.Control 
                                        {...register("password", { required: false })} 
                                        type="password" 
                                        placeholder="Password" 
                                        className={"w-50 border-0"}
                                    />
                                </Form.Group>
                            </div>
                            <h6>Benachrichtungen</h6>
                            <div className={"form-section rounded"}>
                                <Form.Group className="form-group d-inline-flex w-100 justify-content-between">
                                    <Form.Check 
                                        reverse
                                        type="switch"
                                        id="custom-switch1"
                                        label="Jemand hat such über Lehrlingsportal beworben"
                                    />
                                </Form.Group>
                                <Form.Group className="form-group d-inline-flex w-100 justify-content-between">
                                    <Form.Check 
                                        reverse
                                        type="switch"
                                        id="custom-switch2"
                                        label="Jemand hat eine von dir erstellte Lehrstelle bearbeitet"
                                    />
                                </Form.Group>
                                <Form.Group className="form-group d-inline-flex w-100 justify-content-between">
                                    <Form.Check 
                                        reverse
                                        type="switch"
                                        id="custom-switch3"
                                        label="Lehrstelle ist abgelaufen"
                                    />
                                </Form.Group>
                                <Form.Group className="form-group d-inline-flex w-100 justify-content-between">
                                    <Form.Check 
                                        reverse
                                        type="switch"
                                        id="custom-switch4"
                                        label="Newsbeitrag wurde freigegeben"
                                    />
                                </Form.Group>
                            </div>
                            <Button className={"w-100"} variant="primary" type="submit">Speichern</Button>
                        </form>
                    </div>
                </Col>  
            </Row>
        </Container>
    )
}

export default UserProfile
