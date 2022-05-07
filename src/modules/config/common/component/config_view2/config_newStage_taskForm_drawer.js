import React from "react";
import {Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import Config_test_unit from "../config_form/config_test_unit";
import Config_structure_maven from "../config_form/config_structure_maven";
import Config_structure_node from "../config_form/config_structure_node";
import Config_deploy_linux from "../config_form/config_deploy_linux";
import Config_deploy_docker from "../config_form/config_deploy_docker";

const Config_newStage_taskForm_drawer = props =>{

    const {data,setData,setTaskFormDrawer,taskFormDrawer,newStage,setDeployVisible,
        findAllDeployProof, allDeployProofList,setIsPrompt,form
    } = props

    const showTask = () =>{
        switch (newStage){
            case '单元测试':
                return  <Config_test_unit/>
            case 'maven':
                return  <Config_structure_maven/>
            case 'node':
                return  <Config_structure_node/>
            case 'linux':
                return  <Config_deploy_linux
                            setDeployVisible={setDeployVisible}
                            findAllDeployProof={findAllDeployProof}
                            allDeployProofList={allDeployProofList}
                        />
            case 'docker':
                return  <Config_deploy_docker
                            setDeployVisible={setDeployVisible}
                            findAllDeployProof={findAllDeployProof}
                            allDeployProofList={allDeployProofList}
                        />
        }
    }

    const deletePart = () => {
        switch (newStage) {
            case '单元测试' :
                form.setFieldsValue({
                    testOrder: null,
                })
                break
            case 'maven' :
                form.setFieldsValue({
                    mavenAddress: null,
                    mavenOrder: null
                })
                break
            case 'node':
                form.setFieldsValue({
                    nodeAddress: null,
                    nodeOrder: null
                })
                break
            case 'linux':
                form.setFieldsValue({
                    linuxTargetAddress: null,
                    linuxProofName: null,
                    linuxAddress: null,
                    deployShell: null,
                })
                break
            case 'docker':
                form.setFieldsValue({
                    dockerTargetAddress: null,
                    dockerProofName: null,
                    dockerPort: null,
                    mappingPort: null,
                    dockerAddress: null
                })
        }
        for (let i = 0 ;i<data.length;i++){
            if(data[i].desc === newStage){
                data.splice(i,1)
            }
            setData([...data])
            setTaskFormDrawer(false)
            setIsPrompt(true)
        }
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

export default Config_newStage_taskForm_drawer