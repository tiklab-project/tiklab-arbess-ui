import React,{Fragment} from "react";
import ConfigCodeSvn from "../form/configCodeSvn";

const ConfigAddCodeRightSvnDrawer = props =>{

    const {handleClick,configDataStore} = props

    return(
        <Fragment>
            <div className="group-desc group-type gray"
                 style={{width:170}}
                 onClick={()=>handleClick(5,5)}
            >
                <div className="group-desc-tpl">
                    <div className="group-tpl"> SVN </div>
                </div>
            </div>
            <div className="body-menu_form">
                <ConfigCodeSvn configDataStore={configDataStore}/>
            </div>
        </Fragment>
    )
}

export default ConfigAddCodeRightSvnDrawer