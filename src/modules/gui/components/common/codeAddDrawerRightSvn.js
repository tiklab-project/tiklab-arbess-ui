import React from "react";
import CodeSvn from "../formType/codeSvn";

const CodeAddDrawerRightSvn = props =>{

    const {handleClick,codeType} = props

    return(
        <>
            <div
                 className={`group-desc group-type ${codeType===5 ? "gray":""}`}
                 style={{width:170}}
                 onClick={()=>handleClick(5)}
            >
                <div className="group-desc-tpl">
                    <div className="group-tpl"> SVN </div>
                </div>
            </div>
            <div className="body-menu_form">
                <CodeSvn {...props}/>
            </div>
        </>
    )
}

export default CodeAddDrawerRightSvn