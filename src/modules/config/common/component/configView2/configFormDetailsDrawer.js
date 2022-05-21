import React from "react";
import {Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import ConfigCodeGitee from "../configForm/configCodeGitee";
import formResetFields from "../configForm/formResetFields";
import formAll from "../configForm/formAll";

const ConfigFormDetailsDrawer = props =>{

    const {data,setData,setTaskFormDrawer,taskFormDrawer,newStage,setIsPrompt,
        form,setCodeName,setCodeBranch,setCodeData,setNewStageForm
    } = props

    const showTask = () =>{
        switch (newStage){
            case '单元测试':
                return   formAll.unit
            case 'maven':
                return   formAll.maven
            case 'node':
                return   formAll.node
            case 'linux':
                return   formAll.linux
            case 'docker':
                return   formAll.docker
            case '通用Git':
                return   formAll.git
            case 'Gitee':
                return   <ConfigCodeGitee
                            form={form}
                         />
            case 'GitLab':
                return   formAll.gitlab
        }
    }

    const deletePart = () => {
        switch (newStage) {
            case '单元测试' :
                setNewStageForm({ ...formResetFields.unit})
                break
            case 'maven' :
                setNewStageForm({...formResetFields.maven})
                break
            case 'node':
                setNewStageForm({...formResetFields.node})
                break
            case 'linux':
                setNewStageForm({...formResetFields.linux})
                break
            case 'docker':
                setNewStageForm({...formResetFields.docker})
                break
            default:
                setNewStageForm({...formResetFields.git})
        }

        for (let i = 0 ;i<data.length;i++){
            if(data[i].desc === newStage){
                data.splice(i,1)
            }
            setData([...data])
            setCodeName('')
            setCodeBranch('')
        }
        if(newStage === '通用Git' || newStage === 'Gitee'  || newStage=== 'GitLab'){
            setCodeData('')
        }
        setIsPrompt(true)
        setTaskFormDrawer(false)
    }

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setTaskFormDrawer(false)}
            visible={taskFormDrawer}
            width={600}
        >
            <nav className="bm-item-list" style={{height:'100%'}}>
                <div className="menu-wrapper">
                    <div className="menu-wrapper-head">
                        <div className="menu-wrapper-head-title">
                            编辑 &nbsp; &nbsp;
                           <span className='deleted'
                               onClick={()=>deletePart()}
                           >
                               <DeleteOutlined/>
                           </span>
                        </div>
                        <div onClick={()=>setTaskFormDrawer(false)}><CloseOutlined /></div>
                    </div>
                    <div className="menu-wrapper-body" id="pipeline-menu-wrapper-body" style={{padding:0}}>
                        <div className="body">
                            <div className='body-taskForm'>
                                <div className='taskForm-top'>
                                    <div className='taskForm-top_title'>
                                        {newStage}
                                    </div>
                                </div>

                                {showTask()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Drawer>
    )
}

export default ConfigFormDetailsDrawer