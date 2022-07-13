import React,{Fragment} from "react";
import ConfigCodeGiteeOrGithub from "../configForm/configCodeGiteeOrGithub";
import ConfigCodeGitOrGitlab from "../configForm/configCodeGitOrGitlab";

const codeList=[
    {
        type:1,
        title:"通用Git"
    },
    {
        type:2,
        title:"Gitee"
    },
    {
        type:4,
        title:"Gitlab"
    },
    {
        type:3,
        title:"Github"
    }
]

const ConfigAddCodeRightGitDrawer = props =>{

    const {codeOpt,handleClick} = props

    return(
        <Fragment>
            {
                codeList && codeList.map((item,index)=>{
                    return   <div
                                onClick={()=>handleClick(item.type,index)}
                                className={codeOpt === index ? "group-desc group-type gray":"group-desc group-type"}
                                key={item.type}
                                style={{width:170}}
                            >
                                <div className="group-desc-tpl">
                                    <div className="group-tpl"> {item.title} </div>
                                </div>
                            </div>
                })
            }
            <div className="body-menu_form">
                {
                    codeOpt === 0 || codeOpt === 2 ?
                        <ConfigCodeGitOrGitlab/> :  <ConfigCodeGiteeOrGithub/>
                }
            </div>
        </Fragment>
    )
}

export default ConfigAddCodeRightGitDrawer