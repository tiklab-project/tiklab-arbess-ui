import React,{useContext} from "react";
import TestContext from "./testContext";
import {observer} from "mobx-react";
import {Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import CodeSvn from "../formType/codeSvn";
import CodeGitOrGitlab from "../formType/codeGitOrGitlab";
import CodeGiteeOrGithub from "../formType/codeGiteeOrGithub";

const gitList=[
    {
        type:1,
        title:"通用Git"
    },
    {
        type:2,
        title:"Gitee"
    },
    {
        type:3,
        title: "Github"
    },
    {
        type:4,
        title: "Gitlab"
    },
]

const svnList=[
    {
        type:5,
        title:"svn"
    }
]

const CodeAddDrawerRight = props =>{
    const {opt,} = props

    const context = useContext(TestContext)

    const {codeType,setCodeType,isCode} = context.configDataStore
    const changType = context.changType
    const addConfig = context.addConfig
    const del = context.del

    const handleClick = type =>{
        if(codeType==="" || !isCode){
            setCodeType(type)
            addConfig(type)
        }else {
            Modal.confirm({
                title: "切换",
                icon: <ExclamationCircleOutlined />,
                content: "切换后数据无法恢复",
                onOk:()=>chang(type),
                okText: "确认",
                cancelText: "取消",
            })
        }
    }

    const chang = type =>{
        del(type)
        changType(type)
    }
    
    
    const renderList = list => {
        return list.map(item=>{
            return  <div onClick={()=>handleClick(item.type)}
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

    return(
        <div className="body-menu_right">
            {renderList(opt===1?gitList:svnList)}
            <div className="body-menu_form">
                {
                    opt === 2 ?
                        <CodeSvn {...props}/>
                        :
                        codeType ===1 || codeType===3 ?
                            <CodeGiteeOrGithub {...props}/>
                            :
                            <CodeGitOrGitlab {...props}/>
                }
            </div>
        </div>
    )
}

export default observer(CodeAddDrawerRight)