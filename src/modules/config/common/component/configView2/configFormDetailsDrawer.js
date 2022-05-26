import React from "react";
import {Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";

const ConfigFormDetailsDrawer = props =>{

    const {data,setData,setTaskFormDrawer,taskFormDrawer,newStage,setIsPrompt,
        setCodeName,setCodeBranch,setCodeData,del,configName,configForm
    } = props

    const codeDe = () =>{
        return configName(newStage)
    }

    const showTask = () =>{
        return configForm(newStage)
    }

    const deletePart = () => {
        del(newStage)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].desc === newStage){
                data.splice(i,1)
            }
            setData([...data])
        }
        if(newStage === 1 || newStage === 2  ||
            newStage=== 3 || newStage === 4 ){
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
                                        {codeDe()}
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