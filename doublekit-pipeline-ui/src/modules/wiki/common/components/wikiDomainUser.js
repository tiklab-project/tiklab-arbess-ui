import React, { Fragment, useEffect,useState } from "react";
import { PrivilegeDomainUser } from 'doublekit-user-ui';
import { observer, inject } from "mobx-react";

const WikiDomainUser = props => {
    const wikiId = localStorage.getItem("wikiId");;
    return (
        <PrivilegeDomainUser
            {...props}
            domainId={wikiId}
        />
    )
}

export default WikiDomainUser;