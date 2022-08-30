import React from 'react'
import loader from './assets/loader.gif'

const Loader = () => {
    return (
        <div id="loaderContainer" className="w-100 text-center">
            <img src={loader} className="loader m-auto" alt="Loader" /> 
        </div>
    )
}
export default Loader