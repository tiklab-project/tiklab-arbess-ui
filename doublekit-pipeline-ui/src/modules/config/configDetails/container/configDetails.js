import React ,{useState,useEffect } from "react";
import './configDetails.scss'
import PracticeRight from "../components/practiceRight";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";

const ConfigDetails = props =>{

    const {ConfigStore} = props
    const {createCode,createTest,createStructure,createDeploy,updateConfigure} = ConfigStore

    useEffect(()=>{
        return () =>localStorage.removeItem('data')
    },[])

    return(
        <div className='config-details task '>
            <div className='config-details-content'>
                <PracticeRight
                    createCode={createCode}
                    createTest={createTest}
                    createStructure={createStructure}
                    createDeploy={createDeploy}
                    updateConfigure={updateConfigure}
                />
            </div>

        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(ConfigDetails)))