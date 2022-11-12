import React from "react";

const OsIcon = props => {

    const {name} = props

    return (
        <svg  className="icon"
              aria-hidden="true"
        >
            <use xlinkHref={'#icon-' + name}/>
        </svg>
    )
}

export default OsIcon
