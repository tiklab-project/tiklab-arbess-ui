import React from "react";
import { Drawer } from 'antd';
import {CloseOutlined, DeleteOutlined} from "@ant-design/icons";
import Config_code_git from "../config_form/config_code_git";
import Config_code_gitee from "../config_form/config_code_gitee";
import Config_code_gitlab from "../config_form/config_code_gitlab";

const Config_code_details_drawer = props =>{

    const {codeDetailsDrawer,setCodeDetailsDrawer,codeData,setCodeData,setIsPrompt,
        form,setCodeName,setCodeBranch
    } = props

    const deletePart = () =>{
        form.setFieldsValue({
            gitCodeName:null,
            gitBranch:null,
            giteeCodeName:null,
            giteeBranch:null,
            gitlabCodeName:null,
            gitlabBranch:null,
            gitlabProofName:null,
        })
        setCodeData('')
        setCodeDetailsDrawer(false)
        setCodeName('')
        setCodeBranch('')
        setIsPrompt(true)
    }

    const showCode = () =>{
        if(codeData){
            switch (codeData.desc){
                case '通用Git' :
                    return  <Config_code_git
                                setCodeName={setCodeName}
                                setCodeBranch={setCodeBranch}
                            />
                case 'Gitee' :
                    return  <Config_code_gitee
                                form={form}
                                setCodeName={setCodeName}
                                setCodeBranch={setCodeBranch}
                            />
                case 'GitLab' :
                    return  <Config_code_gitlab/>
                    }
        }
    }

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setCodeDetailsDrawer(false)}
            visible={codeDetailsDrawer}
            width={600}
        >
            <nav className="bm-item-list" style={{height:'100%'}}>
                <div className="menu-wrapper visible">
                    <div className="menu-wrapper-head">
                        <div className="menu-wrapper-head-title">
                            编辑 &nbsp; &nbsp;
                            <span className='deleted'
                                  onClick={()=>deletePart()}
                            >
                               <DeleteOutlined/>
                           </span>
                        </div>
                        <div
                            onClick={()=>setCodeDetailsDrawer(false)}
                        >
                            <CloseOutlined />
                        </div>
                    </div>
                    <div className="menu-wrapper-body" id="pipeline-menu-wrapper-body" style={{padding:0}}>
                        <div className="body">
                            <div className='body-taskForm'>
                                <div className='taskForm-top'>
                                    <div className='taskForm-top_title'>
                                        {codeData && codeData.desc}
                                    </div>
                                </div>
                                {showCode()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Drawer>
    )
}

export default Config_code_details_drawer