import React, {
    useState, 
    useEffect, 
    useRef
} from "react"
import axios from "axios"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from "react-router-dom"
import {get_current_root_url} from "../utils"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Loader from './Loader'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate,
} from "react-router-dom"
import { useForm } from "react-hook-form"
import { Editor } from '@tinymce/tinymce-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";



const SingleLehrstellen = (props) => {

    let { lehrstelleId } = useParams()
    let navigate = useNavigate()
    const [currentLehrstelle, setCurrentLehrstelle] = useState()
    const [loading, setLoading] = useState(true)
    const [lehrstelleImages, setLehrstelleImages] = useState([])
    const [imageUploading, setImageUploading] = useState(false)
    const [lehrstelleOptions, setLehrstelleOptions] = useState(props.lehrstelle_options)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const editorRef = useRef(null)

    useEffect(() => {
        console.log(currentLehrstelle)
        
        if(lehrstelleId !== 'new') {
            // axios.options(`${props.site_url}/wp-json/acf/v3/lehrstelle/${lehrstelleId}`)
            //     .then(res => {
            //         console.log('Options response', res.data)
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })

            console.log(`${props.site_url}/wp-json/wp/v2/lehrstelle/${lehrstelleId}`)
            axios.get(`${props.site_url}/wp-json/wp/v2/lehrstelle/${lehrstelleId}`)
                .then(res => {
                    console.log(res.data)
                    setCurrentLehrstelle(res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        } 

        // get lehrstelle options
        axios.get(`${props.site_url}/wp-json/wps_routes/v1/get_lehrstelle_options`)
            .then(res => {
                console.log(res.data)
                setLehrstelleOptions(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })

        
    }, [])

    const updateLehrstelle = (data) => {
        let headers = {
            'Content-Type': 'application/json',
            'X-WP-Nonce': props.nonce
        },
        targetEndpoint = `${props.rest_url}wp/v2/lehrstelle`,
        post_data = {
            fields: {}
        }

        console.log(data)

        // loop through and identify acf fields
        for (let [key, value] of Object.entries(data)) {
            if(key.startsWith("acf_")) {
                let subkey = key.replace('acf_', '')
                console.log(subkey)
                if([
                    'acf_trial_apprenticeship',
                    'acf_work_weekend',
                    'acf_qualification_exam',
                    'acf_work_night'
                ].includes(key)) {
                    value = (value) ? '1' : '0' 
                }
                post_data.fields[subkey] = value
            } else {
                post_data[key] = value
            }
        }

        console.log(post_data)
        // post_data.status = 'publish'
        if(lehrstelleId != 'new') {
            targetEndpoint = `${targetEndpoint}/${lehrstelleId}`
        } 
        axios.post(targetEndpoint, post_data, {
                headers: headers
            })
            .then(res => {
                console.log(res, lehrstelleId)
                if(lehrstelleId == 'new') {
                    console.log('navigating to newly created lehrstelle')
                    navigate(`${props.dash_url}lehrstellen/${res.data.id}`)
                } else {
                    setCurrentLehrstelle(res.data)
                }
            })
            .catch(err => {
                console.error(err)
            })
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
                    setLehrstelleImages([...lehrstelleImages, res.data]);
                    setImageUploading(false);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    const removeImage = (e) => {
        // call axios.delete on the image id endpoint
        let imageId = parseInt(e.target.closest('.lehrstelle-image').dataset.imageid);
        if(imageId) {
            axios.delete(`${props.site_url}/wp-json/wp/v2/media/${imageId}?force=true`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-WP-Nonce': props.nonce
                }
            })
            .then((res) => {
                console.log('remove image res', res);
                // set image data to existing images arr, id, src etc. 
                let filteredImages = lehrstelleImages.filter(image => {
                    return image.id !== imageId;
                })
                console.log('filtered images', filteredImages);
                setLehrstelleImages(filteredImages);
            })
            .catch((err) => {
                console.log(err.response.status)
                if(err.response.status === 404) {
                    let filteredImages = lehrstelleImages.filter(image => {
                        return image.id !== imageId;
                    })
                    console.log('filtered images', filteredImages);
                    setLehrstelleImages(filteredImages);
                }
            })
        }  
    }

    const handleImageBtnClick = (e) => {
        e.preventDefault();
        console.log('upload btn clicked')
        document.querySelector('#image-input').click();
    }

    const addNewContactPerson = (event) => {
        event.preventDefault()
        console.log(event)
    }

    return (
        <Container fluid className={"dashboard-contentwrapper"}>
            <Row>
                <Col xs={12}>
                    <Link to={`${props.dash_url}lehrstellen`}>
                        <FontAwesomeIcon size={"lg"}  style={{ color: '#1D679C' }} icon={faChevronLeft} />zurück zur Lehrstellenübersicht
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {!loading && 
                        <div className={"d-flex flex-column align-items-center"}>
                            <form 
                                className={"lehrstelle-edit-form d-flex flex-column w-100"} 
                                onSubmit={handleSubmit(updateLehrstelle)}>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>01</span>
                                        <span>Titel der Lehrstelle</span>
                                    </div>
                                    <div className={"section-body"}>
                                        <Form.Label htmlFor="lehrstellebezeichnung">Lehrstellenbezeichnung</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="lehrstellebezeichnung"
                                            {...register("title", { required: false })} 
                                            defaultValue={currentLehrstelle?.title?.rendered || ''}
                                        />
                                    </div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>02</span>
                                        <span>Lehrberuf/Einkommen</span>
                                    </div>
                                    <div className={"section-body"}>
                                        <Form.Select aria-label="Default select example">
                                            <option className={"text-muted"}>Beruf auswählen</option>
                                            {lehrstelleOptions.lehrberufe.map(lehrberuf => {
                                                console.log(lehrberuf)
                                                return (
                                                    <option value={lehrberuf.ID}>{lehrberuf.post_title}</option>
                                                )
                                            })}
                                        </Form.Select>
                                        <Form.Label htmlFor="lehrdauer">Lehrdauer</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="lehrdauer"
                                            // {...register("lehrdauer", { required: false })} 
                                            value={currentLehrstelle?.title?.rendered || '1'}
                                        />
                                        <p>Lehrlingseinkommen pro Lehrjahr</p>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Label htmlFor="lehrjar1">Einkpommen 1. Lehrjahr</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    id="lehrjar1"
                                                    // {...register("lehrjar1", { required: false })} 
                                                    value={currentLehrstelle?.title?.rendered || '1'}
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Label htmlFor="lehrjar2">Einkpommen 2. Lehrjahr</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    id="lehrjar2"
                                                    // {...register("lehrjar2", { required: false })} 
                                                    value={currentLehrstelle?.title?.rendered || '1'}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Label htmlFor="lehrjar3">Einkpommen 3. Lehrjahr</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    id="lehrjar3"
                                                    // {...register("lehrjar3", { required: false })} 
                                                    value={currentLehrstelle?.title?.rendered || '1'}
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Label htmlFor="lehrjar4">Einkpommen 4. Lehrjahr</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    id="lehrjar4"
                                                    // {...register("lehrjar4", { required: false })} 
                                                    value={currentLehrstelle?.title?.rendered || '1'}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>03</span>
                                        <span>Details zur Lehrstelle</span>
                                    </div>
                                    <div className={"section-body"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Control type="number"></Form.Control>
                                                <Form.Label htmlFor="lehrjar4">Eintrittsdatum</Form.Label>
                                                <Form.Control 
                                                    type="date" 
                                                    id={"start_date"}
                                                ></Form.Control>
                                                <Form.Check 
                                                    type={"checkbox"}
                                                    id={`absofort`}
                                                    label={`ab sofort`}
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <h5>Zusatzinformation</h5>
                                                <Form.Check 
                                                    type={"checkbox"}
                                                    id={`checkbox1`}
                                                    label={`Schnupperlehre`}
                                                    defaultChecked={(currentLehrstelle?.acf?.trial_apprenticeship === "1") ? true : false}
                                                    {...register("acf_trial_apprenticeship", { required: false })} 
                                                />
                                                <Form.Check 
                                                    type={"checkbox"}
                                                    id={`checkbox2`}
                                                    label={`Wochenendarbeit`}
                                                    defaultChecked={(currentLehrstelle?.acf?.work_weekend == "1") ? true : false}
                                                    {...register("acf_work_weekend", { required: false })} 
                                                />
                                                <Form.Check 
                                                    type={"checkbox"}
                                                    id={`checkbox3`}
                                                    label={`Lehre mit Matura`}
                                                    defaultChecked={(currentLehrstelle?.acf?.qualification_exam === "1") ? true : false}
                                                    {...register("acf_qualification_exam", { required: false })} 
                                                />
                                                <Form.Check 
                                                    type={"checkbox"}
                                                    id={`checkbox4`}
                                                    label={`Nachtarbeit`}
                                                    defaultChecked={(currentLehrstelle?.acf?.work_night === "1") ? true : false}
                                                    {...register("acf_work_night", { required: false })} 
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                Online ab
                                                <Form.Control 
                                                    type="date"
                                                    id={"start_date"}
                                                    {...register("acf_start_date", { required: false })}
                                                ></Form.Control>
                                            </Col>
                                            <Col xs={6}>
                                                Online bis
                                                <Form.Control 
                                                    type="date"
                                                    id={"gultig_bis"}
                                                    {...register("acf_gultig_bis", { required: false })}
                                                ></Form.Control>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>04</span>
                                        <span>Standort/e</span>
                                    </div>
                                    <div className={"section-body"}>
                                        <Form.Select aria-label="Default select example">
                                            <option className={"text-muted"}>Standort auswählen</option>
                                            {lehrstelleOptions.lehrberufe.map(lehrberuf => {
                                                return (
                                                    <option value={lehrberuf.ID}>{lehrberuf.post_title}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>05</span>
                                        <span>Jobbeschreibung</span>
                                    </div>
                                    <div className={"section-body"}>
                                        <Editor
                                            apiKey='zjwijr2vw83yvp2qk5oxkeqcwo4oly8ovphpqlb41gv0511m'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue={currentLehrstelle?.content?.rendered || "Jobbescheibung hier"}
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>06</span>
                                        <span>Bilder</span>
                                    </div>
                                    <div className={"section-body"}>
                                    <div className="form-group img-upload-group">
                                        <button className="img-upload-btn rounded" onClick={(e) => handleImageBtnClick(e)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                            Bilder hier hineinzeihen
                                        </button>
                                        <input
                                            id="image-input"
                                            name="lehrstelleImages"
                                            className="image-input d-none"
                                            type="file"
                                            accept="image/*;capture=camera"
                                            defaultValue=""
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                            multiple
                                        />
                                        <div className="d-inline-flex image-preview">
                                            {lehrstelleImages.map((image, index) => {
                                                return (
                                                    <div className="lehrstelle-image" key={index} data-imageid={image.id} data-imagename={image.name}>
                                                        <div className="delete-image" onClick={removeImage}>
                                                            <i className="fas fa-times-circle"></i>
                                                        </div>
                                                        <div 
                                                            className="lehrstelle-image-item rounded"
                                                            style={{
                                                                backgroundImage: `url(${image.src || image.source_url})`,
                                                                height: "150px", 
                                                                width: "150px",
                                                                backgroundRepeat: "no-repeat",
                                                                backgroundSize: "cover"
                                                        }}>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {imageUploading && <div className="tiny d-flex align-items-center justify-content-center"><Loader /></div>}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>07</span>
                                        <span>Videos</span>
                                    </div>
                                    <div className={"section-body"}></div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>08</span>
                                        <span>Benefits</span>
                                    </div>
                                    <div className={"section-body"}></div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>09</span>
                                        <span>Ansprechpartnerin</span>
                                    </div>
                                    <div className={"section-body"}>
                                        <Form.Select 
                                            aria-label="Default select example"
                                            // {...register("application_contactperson", { required: false })} 
                                        >
                                            <option value=''>Open this select menu</option>
                                            {lehrstelleOptions.contact_people.map(person => {
                                                return (
                                                    <option value={person.ID}>{person.post_title}</option>
                                                    // <option value={person.id}>{person.acf.vorname} {person.acf.nachname}</option>
                                                )
                                            })}
                                        </Form.Select>
                                        <Button className={"w-100"} variant="secondary" onClick={(event) => addNewContactPerson(event)}>neues AnsprechpartnerIn erstellen</Button>{' '}
                                    </div>
                                </div>
                                <div className={"form-section bg-white rounded shadow-sm"}>
                                    <div className={"section-header"}>
                                        <span className={"number"}>10</span>
                                        <span>Bewerben per</span>
                                    </div>
                                    <div className={"section-body"}>
                                        <Form.Check 
                                            type={"checkbox"}
                                            id={`contact_person`}
                                            label={`Ansprechpartner`}
                                        />
                                        <Form.Check 
                                            type={"checkbox"}
                                            id={`alternative_email`}
                                            label={`Alternative Email`}
                                        />
                                        <Form.Check 
                                            type={"checkbox"}
                                            id={`external`}
                                            label={`externen Link`}
                                        />
                                    </div>
                                </div>
                                <Row>
                                    <Col xs={4}>
                                        <Button className={"w-100"} variant="primary" type="submit">Als Entwurf Speichern</Button>{' '}
                                    </Col>
                                    <Col xs={4}>
                                        <Button className={"w-100"} variant="primary" type="submit">Vorschau</Button>{' '}
                                    </Col>
                                    <Col xs={4}>
                                        <Button className={"w-100"} variant="primary" type="submit">Veröffentlichen</Button>{' '}
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    }
                </Col>  
            </Row>
        </Container>
    )
}

export default SingleLehrstellen
