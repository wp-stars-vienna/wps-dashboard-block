import "../index.scss"
import React, {useEffect} from "react"

// Init the contact block
const {InspectorControls, MediaUpload, MediaUploadCheck} = wp.blockEditor
const {PanelBody, Button, ResponsiveWrapper} = wp.components
const {withSelect} = wp.data
const {__} = wp.i18n


function ContactBlockEditor(props) {

    function updateTitle(e) {
        props.setAttributes({title: e.target.value})
    }

    function updateSubTitle(e) {
        props.setAttributes({subTitle: e.target.value})
    }

    function updateEmail(e) {
        props.setAttributes({email: e.target.value})
    }

    function updatePhone(e) {
        props.setAttributes({phone: e.target.value})
    }

    function updateFacebook(e) {
        props.setAttributes({facebook: e.target.value})
    }

    function updateInstagram(e) {
        props.setAttributes({instagram: e.target.value})
    }


    const removeMedia = () => {
        props.setAttributes({
            mediaId: 0, mediaUrl: ''
        });
    }

    const onSelectMedia = (media) => {
        props.setAttributes({
            mediaId: media.id, mediaUrl: media.url
        });
    }

    useEffect(() => {

    }, [])

    return (<div className="wpsContactBlock">
            <h5>Small Contact Block</h5>
            <input type="text" value={props.attributes.title} onChange={updateTitle} placeholder="Title..."/>
            <input type="text" value={props.attributes.subTitle} onChange={updateSubTitle} placeholder="Sub title..."/>

            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelectMedia}
                    value={props.attributes.mediaId}
                    allowedTypes={['image']}
                    render={({open}) => (<Button
                            className={props.attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                            onClick={open}
                        >
                            {props.attributes.mediaId == 0 && __('Choose an image', 'awp')}
                            {props.media != undefined && <ResponsiveWrapper
                                naturalWidth={props.media.media_details.width}
                                naturalHeight={props.media.media_details.height}
                            >
                                <img src={props.media.source_url}/>
                            </ResponsiveWrapper>}
                        </Button>)}
                />
            </MediaUploadCheck>
            {props.attributes.mediaId != 0 && <MediaUploadCheck>
                <MediaUpload
                    title={__('Replace image', 'awp')}
                    value={props.attributes.mediaId}
                    onSelect={onSelectMedia}
                    allowedTypes={['image']}
                    render={({open}) => (
                        <Button onClick={open} isDefault isLarge>{__('Replace image', 'awp')}</Button>)}
                />
            </MediaUploadCheck>}
            {props.attributes.mediaId != 0 && <MediaUploadCheck>
                <Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'awp')}</Button>
            </MediaUploadCheck>}

            <input type="text" value={props.attributes.email} onChange={updateEmail} placeholder="Email"/>
            <input type="text" value={props.attributes.phone} onChange={updatePhone} placeholder="Phone"/>
            <input type="text" value={props.attributes.facebook} onChange={updateFacebook} placeholder="Facebook"/>
            <input type="text" value={props.attributes.instagram} onChange={updateInstagram} placeholder="Instagram"/>
        </div>)
}

export default ContactBlockEditor
