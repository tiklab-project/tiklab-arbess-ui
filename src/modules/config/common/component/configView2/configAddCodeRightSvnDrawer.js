import React, {Fragment} from "react";
import formAll from "../configForm/formAll";

const ConfigAddCodeRightSvnDrawer = props =>{

    const {handleClick} = props

    return(
        <Fragment>
            <div
                className='group-desc group-type gray'
                style={{width:170}}
                onClick={()=>handleClick(5,5)}
            >
                <div className='group-desc-tpl'>
                    <div className='group-tpl'> SVN </div>
                </div>
            </div>

            <div className='body-menu_form'> { formAll.svn } </div>
        </Fragment>
    )
}

export default ConfigAddCodeRightSvnDrawer