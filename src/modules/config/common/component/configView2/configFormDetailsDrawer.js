import React from "react";
import {Button, Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";

const ConfigFormDetailsDrawer = props =>{

    const {data,setData,taskFormDrawer,setTaskFormDrawer,newStage,del,configName,configForm} = props

    const codeDe = () =>{
        return configName(newStage)
    }

    const showTask = () =>{
        return configForm(newStage)
    }

    const deletePart = () => {
        del(newStage)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataType === newStage){
                data.splice(i,1)
            }
            setData([...data])
        }
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
                           <span className='deleted' onClick={()=>deletePart()}>
                               <DeleteOutlined/>
                           </span>
                        </div>
                        <div>
                            <Button type='text' onClick={()=>setTaskFormDrawer(false)}>
                                <CloseOutlined />
                            </Button>
                        </div>
                    </div>
                    <div className="menu-wrapper-body" id="pipeline-menu-wrapper-body" style={{padding:0}}>
                        <div className="body">
                            <div className='body-taskForm'>
                                <div className='taskForm-top'>
                                    <div className='taskForm-top_title'>{codeDe()}</div>
                                </div>
                                <div> {showTask()} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Drawer>
    )
}

export default ConfigFormDetailsDrawer