import "../index.scss"
import React, {useEffect, useState} from "react"
import axios from 'axios'
import {SelectControl} from '@wordpress/components';
import {get_current_root_url} from '../utils';

function DashboardBlockEditor(props) {
    function updateFooterLink(e) {
        //console.log(e.target.value)
        props.setAttributes({ footerLink: e.target.value })
    }

    function updatePostSelection(newPost) {
        props.setAttributes({ posts: newPost })
    }

    const [postOptions, setPostOptions] = useState([])

    useEffect(() => {
        //console.log(props)
        
    }, [])

    return (
        <div className="wpsDashboardBackend">
            <h5>Dashboard Block Editor</h5>
            <SelectControl
                multiple
                label="Select posts to be featured in this block"
                value={ props.attributes.posts }
                options={ postOptions }
                onChange={ ( newPost ) => updatePostSelection( newPost ) }
            />
            <label form="footer_link">Footer Link</label>
            <input name="footer_link" type="text" onChange={(e) => updateFooterLink(e)} value={props.attributes.footerLink} placeholder="Teaser Footer Link" />
        </div>
    )
}

export default DashboardBlockEditor