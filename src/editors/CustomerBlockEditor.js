import "../index.scss"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {SelectControl} from '@wordpress/components';
import {get_current_root_url} from "../utils";

function CustomerBlockEditor(props) {

    const [ customerOptions, setCustomerOptions ] = useState([])

    function updateCustomerSelection(newCustomer) {
        props.setAttributes({ items: newCustomer })
    }

    useEffect(() => {
        axios.get(get_current_root_url() + "wp-json/wp/v2/customer?_fields=id,title")
            .then(resp => {
                let options = resp.data.map(post => {
                    return({
                        label: post.title.rendered,
                        value: post.id
                    })
                })
                setCustomerOptions(options)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <div className={"customerBlockEditor"}>
            <h5>Customer Block Editor</h5>
            <SelectControl
                multiple
                label={"Select Customers to be displayed"}
                value={ props.attributes.items }
                options={ customerOptions }
                onChange={ updateCustomerSelection }
            />
        </div>
    )
}

export default CustomerBlockEditor