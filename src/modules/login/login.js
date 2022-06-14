import React from 'react';
import { Login, EAM_STORE } from 'doublekit-eam-ui';
import {inject, observer} from 'mobx-react';

const LoginContent = (props)=> {

    return(
        <Login
            {...props}
            loginGoRouter='/'
            fetchMethod={fetchMethod}
            languageUrl={pluginAddressUrl}
        />
    )

}

export default inject(EAM_STORE)(observer(LoginContent)) ;
