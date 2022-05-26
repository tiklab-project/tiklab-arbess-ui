import React from "react";
import {Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import formAll from "../configForm/formAll";

const ConfigFormDetailsDrawer = props =>{

    const {data,setData,setTaskFormDrawer,taskFormDrawer,newStage,setIsPrompt,
        setCodeName,setCodeBranch,setCodeData,del
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
                return   formAll.gitOrGitlab
            case 'Gitee':
                return   formAll.giteeOrGithub
            case 'Gitlab':
                return   formAll.gitOrGitlab
            case 'Github' :
                return formAll.giteeOrGithub
        }
    }

    const deletePart = () => {
        del(newStage)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].desc === newStage){
                data.splice(i,1)
            }
            setData([...data])
        }
        if(newStage === '通用Git' || newStage === 'Gitee'  ||
            newStage=== 'Gitlab' || newStage === 'Github'){
                setCodeData('')
                setCodeName('')
                setCodeBranch('')
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