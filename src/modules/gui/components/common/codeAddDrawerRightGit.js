import React from "react";
import CodeGitOrGitlab from "../formType/codeGitOrGitlab";
import CodeGiteeOrGithub from "../formType/codeGiteeOrGithub";

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
        title: "Gitlab"
    },
    {
        type:3,
        title: "Github"
    }
]

const CodeAddDrawerRightGit = props =>{

    const {codeType,handleClick} = props

    return(
        <>
            {
                codeList && codeList.map((item,index)=>{
                    return   <div onClick={()=>handleClick(item.type)}
                                  className={`group-desc group-type ${codeType===item.type ? "gray":""}`}
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
                    codeType === 2 || codeType === 4 ?
                        <CodeGiteeOrGithub {...props}/>
                        :
                        <CodeGitOrGitlab  {...props}/>
                }
            </div>
        </>
    )
}

export default CodeAddDrawerRightGit