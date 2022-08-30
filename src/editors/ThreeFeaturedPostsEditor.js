import "../index.scss"
import React, {useState, useEffect} from "react"
import axios from 'axios'
import {SelectControl} from '@wordpress/components';
import {get_current_root_url} from '../utils';

function ThreeFeaturedEditComponent(props) {
    function updateFooterLink(e) {
        //console.log(e.target.value)
        props.setAttributes({ footerLink: e.target.value })
    }

    function updatePostSelection(newPost) {
        //console.log(newPost)
        // console.log(getSelectedOptions(e.target))
        // let posts = getSelectedOptions(e.target);
        props.setAttributes({ posts: newPost })
    }

    const [postOptions, setPostOptions] = useState([])

    useEffect(() => {
        //console.log(props)
        axios.get(get_current_root_url() + 'wp-json/wp/v2/posts?per_page=3')
            .then(res => {
                //console.log(res.data)
                let postOptions = res.data.map(post => {
                    return (
                        {
                            label: post.title.rendered,
                            value: post.id
                        }
                    )
                })
                setPostOptions(postOptions)
                //console.log(postOptions)
                //console.log(props.attributes.posts)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <div className="wpsThreeFeaturedBackend">
            <h5>Three Featured Products</h5>
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

export default ThreeFeaturedEditComponent